from django.views.generic.base import TemplateView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from .models import Public
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json


class PublicView(TemplateView):
    template_name = 'public.html'


def send_chat_to_users(username, time, content):
    channel_layer = get_channel_layer()
    group_name = 'public_chat'

    # noinspection PyArgumentList
    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            'type': 'chat_massage',
            'username': username,
            'time': time,
            'content': content,
        }
    )


@csrf_exempt
def submit_public_chat(request):
    if request.method == 'POST':
        user = request.user
        content = request.POST.get('content')
        if len(content) == 0 or len(content) > 400:
            return JsonResponse({'massage': 'Invalid chat length'})
        new_chat = Public.objects.create(user=user, chat_content=content)

        send_chat_to_users(user.username, new_chat.chat_time.strftime('%Y/%m/%d %H:%M'), content)  # 向在线用户发送新的chat
        return JsonResponse({'massage': 'chat submitted successfully'})

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


