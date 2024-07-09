from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model


class Blogs(models.Model):
    user_uid = models.IntegerField()
    blog_id = models.AutoField(primary_key=True)
    blog_title = models.CharField(max_length=50)
    blog_content = models.TextField()
    publish_time = models.DateTimeField(default=timezone.now)
    view_num = models.IntegerField(default=0)
    like_num = models.PositiveIntegerField(default=0)


class BlogsLike(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)#CASCADE级联 若父对象(user)被删除 该字段也被删除
    blog = models.ForeignKey(Blogs, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'blog')
