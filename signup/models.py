from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):  # 使用django的user 但添加一个uid 需要在setting中设置
    uid = models.AutoField(primary_key=True)
