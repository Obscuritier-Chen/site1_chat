# Generated by Django 5.0.1 on 2024-06-08 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserTopImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topImage', models.ImageField(upload_to='topImage/')),
                ('uid', models.IntegerField(unique=True)),
            ],
        ),
    ]