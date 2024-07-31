import re
import json
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.generic.base import TemplateView
from django.views.decorators.csrf import csrf_exempt
from .models import UserPageDetail, UserTopImage, UserPage


class UserView(TemplateView):
    template_name = 'user.html'


def get_user_info(request, uid):
    try:
        user = get_user_model().objects.get(uid=uid)
        username = user.username
    except get_user_model().DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    try:
        signature = UserPageDetail.objects.get(uid=uid).signature
    except UserPageDetail.DoesNotExist:
        signature = None

    return JsonResponse({'username': username, 'signature': signature})


@csrf_exempt
def update_user_signature(request):
    if request.method == 'POST':
        uid = request.user.uid
        uid = int(uid)
        submitted_signature = request.POST.get('signature')
        signature_pattern = r'^[!-~]{0,50}$'
        if not re.match(signature_pattern, submitted_signature):
            return JsonResponse({'message': 'illegal form'})
        # 查找或创建 UserPageDetail 对象
        user_page_detail, created = UserPageDetail.objects.update_or_create(
            uid=uid,
            defaults={'signature': submitted_signature}
        )
        return JsonResponse({'message': 'upload signature successfully'})

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def upload_user_topImage(request):
    if request.method == 'POST':
        if not request.FILES.get('topImage'):
            return JsonResponse({'message': 'invalid file'})
        uid = request.user.uid
        uid = int(uid)
        submitted_image = request.FILES['topImage']
        user_top_image, created = UserTopImage.objects.update_or_create(
            uid=uid,
            defaults={'topImage': submitted_image}
        )
        return JsonResponse({'message': 'upload topImage successfully', 'image_url': user_top_image.topImage.url})

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_user_topImage(request, uid):
    try:
        top_image = UserTopImage.objects.get(uid=uid).topImage
    except UserTopImage.DoesNotExist:
        return JsonResponse({'message': 'topImage not found'})
    return JsonResponse({'message': 'get topImage successfully', 'image_url': top_image.url})


@csrf_exempt
def upload_user_page(request):
    if request.method == 'POST':
        try:
            uid = request.user.uid
            uid = int(uid)
            data = json.loads(request.body)
            content = data.get('content', '')
            user_page, created = UserPage.objects.update_or_create(
                uid=uid,
                defaults={'userPage': content}
            )
            return JsonResponse({'message': 'upload userPage successfully', 'content': content})

        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON Data'})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_user_page(request, uid):
    try:
        content = UserPage.objects.get(uid=uid).userPage
    except UserPage.DoesNotExist:
        return JsonResponse({'message': 'userPage not found'})
    return JsonResponse({'message': 'get userPage successfully', 'content': content})
