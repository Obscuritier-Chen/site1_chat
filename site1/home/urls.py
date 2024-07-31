from django.urls import path
from . import views
from .views import text_list
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('api/texts/', text_list, name='text-list'),
    path('post-text/', views.handle_text_post, name='post-text'),
    path('user_logout/', views.user_logout, name='user-logout'),
    path('check_login_status/', views.check_login_status, name='check-login-status'),
    path('api/get_user_info/', views.get_user_info, name='get-user-info'),
]
