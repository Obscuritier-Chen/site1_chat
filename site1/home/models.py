from django.db import models


class Text(models.Model):
    text = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.text
