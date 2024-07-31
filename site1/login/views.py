from django.views.generic.base import TemplateView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, get_user_model, login
from rest_framework.authtoken.models import Token


class LoginView(TemplateView):
    template_name = 'login.html'


@csrf_exempt
def check_login_status(request):
    if request.method == 'POST':
        user = request.user
        if user.is_authenticated:
            return JsonResponse({'message': 'Logged user'})
        else:
            return JsonResponse({'message': 'User not logged in'})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def handle_login_post(request):
    if request.method == 'POST':
        submitted_username = request.POST['username']
        submitted_password = request.POST['password']

        User = get_user_model()
        try:
            user = User.objects.get(username=submitted_username)
        except User.DoesNotExist:
            return JsonResponse({'failure': 'user does not exist'})

        # 验证用户密码是否正确
        user = authenticate(username=submitted_username, password=submitted_password)
        if user is not None:
            # 用户名存在并且密码正确
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return JsonResponse({'success': 'login successfully', 'token': token.key})
        else:
            # 用户名存在但密码不正确
            return JsonResponse({'failure': 'incorrect password'})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
