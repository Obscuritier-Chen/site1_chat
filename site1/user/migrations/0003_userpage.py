# Generated by Django 5.0.1 on 2024-06-10 07:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_usertopimage'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userPage', models.TextField()),
            ],
        ),
    ]