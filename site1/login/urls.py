from django.urls import path
from . import views

urlpatterns = [
    path('', views.LoginView.as_view(), name='login'),
    path('post-login/', views.handle_login_post, name='post-login'),
    path('api/check_login_status/', views.check_login_status, name='check-login-status')
]