from django.db import models


class UserPageDetail(models.Model):
    uid = models.IntegerField(unique=True)  # uid 数字字段，设定为唯一
    signature = models.CharField(max_length=100, null=True, blank=True)  # signature 字符字段，最大长度为100


class UserTopImage(models.Model):
    topImage = models.ImageField(upload_to='topImage/')
    uid = models.IntegerField(unique=True)


class UserPage(models.Model):
    userPage = models.TextField()
    uid = models.IntegerField(unique=True)
