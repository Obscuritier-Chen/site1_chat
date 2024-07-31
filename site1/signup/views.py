import re
from django.views.generic.base import TemplateView
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt


class SignupView(TemplateView):
    template_name = 'signup.html'


def form_checker(username, password):
    username_pattern = r'^[a-zA-Z0-9_-]{5,15}$'
    password_pattern = r'^[!-~]{6,30}$'  # 键盘可输入字符

    if not re.match(username_pattern, username) or not re.match(password_pattern, password):
        return False
    return True


@csrf_exempt
def handle_signup_post(request):
    if request.method == 'POST':
        submitted_username = request.POST.get('username')
        submitted_password = request.POST.get('password')

        if not form_checker(submitted_username, submitted_password):
            return JsonResponse({'error': 'illegal form'})

        User = get_user_model()

        existing_user = User.objects.filter(username=submitted_username).exists()
        if existing_user:
            return JsonResponse({'error': 'existing username'})

        new_user = User.objects.create_user(username=submitted_username, password=submitted_password)
        return JsonResponse({'success': 'signup successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
