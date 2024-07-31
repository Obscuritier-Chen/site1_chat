from django.views.generic.base import TemplateView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from .models import Blogs, BlogsLike, BlogsComment
import json
from math import ceil


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
    user = request.user
    try:
        blog = Blogs.objects.get(blog_id=blog_id)
        blog.view_num += 1
        blog.save()

        try:
            like = BlogsLike.objects.get(blog_id=blog_id, user=user)
            like_status = False  # 不提前声明就用好奇怪
        except BlogsLike.DoesNotExist:
            like_status = True

        response_data = {
            'uid': blog.user_uid,
            'blog_title': blog.blog_title,
            'year': blog.publish_time.year,
            'month': blog.publish_time.month,
            'day': blog.publish_time.day,
            'hour': blog.publish_time.hour,
            'minute': blog.publish_time.minute,
            'view_num': blog.view_num,
            'like_num': blog.like_num,
            'like_status': like_status,
            'comment_num': blog.comment_num,
            'content': blog.blog_content,
            'message': 'get blog successfully',
        }
        return JsonResponse(response_data)
    except Blogs.DoesNotExist:
        return JsonResponse({'message': 'blog not found'}, status=404)


@csrf_exempt
def give_delete_like(request, blog_id):
    if request.method == 'POST':
        user = request.user
        try:
            blog = Blogs.objects.get(blog_id=blog_id)
            like, created = BlogsLike.objects.get_or_create(user=user, blog=blog)

            if created:
                blog.like_num += 1
                blog.save()
                return JsonResponse({'message': 'blog like successfully', 'like_num': blog.like_num})
            else:
                like.delete()
                blog.like_num -= 1
                blog.save()
                return JsonResponse({'message': 'blog like delete successfully', 'like_num': blog.like_num})
        except Blogs.DoesNotExist:
            return JsonResponse({'message': 'blog not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_blog_comment(request, blog_id, page=1):
    try:
        blog = Blogs.objects.get(blog_id=blog_id)
        if page <= 0 or page > ceil(blog.comment_num/10):
            return JsonResponse('message', 'invalid page number')
        comments = BlogsComment.get_paginated_comments(blog, page)
        serialised_comments = [{
            'comment_id': comment.comment_id,
            'username': comment.user.username,
            'uid': comment.user.uid,
            'year': comment.comment_time.year,
            'month': comment.comment_time.month,
            'day': comment.comment_time.day,
            'hour': comment.comment_time.hour,
            'minute': comment.comment_time.minute,
            'content': comment.content,
        } for comment in comments]

        return JsonResponse({'message': 'get comments successfully', 'comments': serialised_comments, 'comment_num': blog.comment_num})

    except Blogs.DoesNotExist:
        return JsonResponse({'message': 'blog not found'}, status=404)


@csrf_exempt
def create_blog_comment(request, blog_id):
    if request.method == 'POST':
        user = request.user
        content = request.POST.get('content')

        if len(content) >= 200 or len(content) <= 0:
            return JsonResponse({'message': 'illegal comment'})
        try:
            blog = Blogs.objects.get(blog_id=blog_id)
            blog.comment_num += 1
            blog.save()
            comment = BlogsComment.objects.create(
                blog=blog,
                user=user,
                content=content,
            )
            response = get_blog_comment(request, blog_id)  # 从jsonResponse提取数据并不常见，但我懒得再写一个函数
            response_data = json.loads(response.content)
            response_data['message'] = 'comment created successfully'
            response_data['comment_num'] = blog.comment_num
            return JsonResponse(response_data)

        except Blogs.DoesNotExist:
            return JsonResponse({'message': 'blog not found'}, status=404)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def delete_blog_comment(request, comment_id):
    if request.method == 'POST':
        user = request.user
        try:
            comment = BlogsComment.objects.get(comment_id=comment_id)
            if comment.is_deleted:
                return JsonResponse({'message': 'comment has been deleted'})
            if comment.user.uid == user.uid:

                comment.blog.comment_num -= 1
                comment.blog.save()
                comment.is_deleted = True
                comment.save()

                response = get_blog_comment(request, comment.blog_id)  # 从jsonResponse提取数据并不常见，但我懒得再写一个函数
                response_data = json.loads(response.content)
                response_data['message'] = 'comment deleted successfully'
                response_data['comment_num'] = comment.blog.comment_num
                return JsonResponse(response_data)

            else:
                return JsonResponse({'message': 'do not have authority'}, status=401)
        except BlogsComment.DoesNotExist:
            return JsonResponse({'message': 'comment not found'}, status=404)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
