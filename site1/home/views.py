from django.views.generic.base import TemplateView
from django.http import JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from .models import Text
from django.contrib.auth import get_user_model, logout


class HomeView(TemplateView):
    template_name = 'home.html'


def text_list(request):
    texts = Text.objects.all().values('text')
    return JsonResponse(list(texts), safe=False)


@csrf_exempt
def handle_text_post(request):
    if request.method == 'POST':
        submitted_text = request.POST.get('text', '')  # 获取提交的文本字段
        new_text_object = Text(text=submitted_text)
        new_text_object.save()  # 将文本数据保存到数据库中
        return JsonResponse({'newText': submitted_text})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def user_logout(request):
    logout(request)
    return JsonResponse({'message': 'logout successfully'})


@csrf_exempt
def check_login_status(request):
    if request.method == 'POST':
        user = request.user
        if not user.is_authenticated:
            return JsonResponse({'message': 'User not logged in'})
        else:
            username = user.username
            uid = user.uid
            return JsonResponse({'message': 'Logged user', 'username': username, 'uid': uid})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_user_info(request):
    if request.method == 'GET':
        username = request.user.username
        uid = request.user.uid
        return JsonResponse({'username': username, 'uid': uid})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
