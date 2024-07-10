我们可以在现有的点赞功能上添加取消点赞的功能。这个功能可以通过检查用户是否已经点赞来实现。如果用户已经点赞，则取消点赞并减少点赞数。以下是更新后的代码示例：

### `models.py`

在 `Like` 模型中无需做任何修改。

### `views.py`

在视图中更新点赞和取消点赞的逻辑：

```python
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth import get_user_model
from .models import Blog, Like

User = get_user_model()

@require_POST
def create_blog(request):
    user = request.user
    title = request.POST.get('title')
    content = request.POST.get('content')
    
    blog = Blog.objects.create(user=user, blog_title=title, blog_content=content)
    
    return JsonResponse({
        'message': 'Blog created successfully',
        'blog_id': blog.blog_id,
        'blog_title': blog.blog_title,
        'blog_content': blog.blog_content,
        'like_count': blog.like_count,
        'created_at': blog.created_at,
    })

@require_POST
def like_blog(request):
    user = request.user
    blog_id = request.POST.get('blog_id')
    blog = get_object_or_404(Blog, blog_id=blog_id)
    
    like, created = Like.objects.get_or_create(user=user, blog=blog)
    
    if created:
        blog.like_count += 1
        blog.save()
        return JsonResponse({'message': 'Liked successfully', 'like_count': blog.like_count})
    else:
        like.delete()
        blog.like_count -= 1
        blog.save()
        return JsonResponse({'message': 'Unliked successfully', 'like_count': blog.like_count})
```

### 配置 URLs

确保 URL 配置文件中包含点赞功能的路径：

```python
# blogs/urls.py

from django.urls import path
from .views import create_blog, like_blog

urlpatterns = [
    path('create/', create_blog, name='create_blog'),
    path('like/', like_blog, name='like_blog'),
]
```

### 前端

前端可以通过 `fetch` 请求来实现点赞和取消点赞的功能。以下是一个示例：

```html
<button id="like-button">Like/Unlike</button>

<script>
    document.getElementById('like-button').addEventListener('click', () => {
        const blogId = 1;  // 替换为实际的 blog_id
        fetch('/blogs/like/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),  // 确保包含 CSRF 令牌
            },
            body: JSON.stringify({
                blog_id: blogId
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            console.log(`Like count: ${data.like_count}`);
        })
        .catch(error => console.error('Error:', error));
    });

    // 获取 CSRF 令牌的函数
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
</script>
```

这个代码片段展示了如何使用 JavaScript 发送 POST 请求来点赞或取消点赞。你需要确保在模板中包含 CSRF 令牌并将其发送到服务器，以避免 CSRF 攻击。
