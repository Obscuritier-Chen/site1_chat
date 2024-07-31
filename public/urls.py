from django.urls import path
from . import views

urlpatterns = [
    path('', views.PublicView.as_view(), name='public'),
    path('api/submit_public_chat/', views.submit_public_chat, name='submit-public-chat'),
]
