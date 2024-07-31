from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model


class Public(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    chat_id = models.AutoField(primary_key=True)
    chat_content = models.CharField(max_length=500)
    chat_time = models.DateTimeField(default=timezone.now)
    is_deleted = models.BooleanField(default=False)

    def get_latest_chat(cls, first_chat):
        return cls.objects.filter(is_deleted=False).order_by('-chat_id')[first_chat-1:first_chat+100]

