from django.views.generic.base import TemplateView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from .models import Blogs
import json


class BlogDisplayView(TemplateView):
    template_name = 'blog_display.html'


class BlogPublishView(TemplateView):
    template_name = 'blog_publish.html'


@csrf_exempt
def blog_publish(request):
    if request.method == 'POST':
        try:
            uid = request.user.uid
            uid = int(uid)
            title = request.POST.get('title')
            content = request.POST.get('content')

            new_blog = Blogs.objects.create(user_uid=uid, blog_title=title, blog_content=content)

            return JsonResponse({'message': 'blog published successfully', 'blog_id': new_blog.blog_id})

        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON Data'})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_blog_data(request, blog_id):
    try:
        blog = Blogs.objects.get(blog_id=blog_id)
        blog.view_num += 1
        blog.save()
        response_data = {
            'uid': blog.user_uid,
            'blog_title': blog.blog_title,
            'year': blog.publish_time.year,
            'month': blog.publish_time.month,
            'day': blog.publish_time.day,
            'hour': blog.publish_time.hour,
            'minute': blog.publish_time.minute,
            'view_num': blog.view_num,
            'content': blog.blog_content,
            'message': 'get blog successfully',
        }
        return JsonResponse(response_data)
    except Blogs.DoesNotExist:
        return JsonResponse({'message': 'blog not found'}, status=404)

