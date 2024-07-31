from django.urls import path
from . import views

urlpatterns = [
    path('', views.SignupView.as_view(), name='signup'),
    path('post-new-user/', views.handle_signup_post, name='post-new-user'),
]
