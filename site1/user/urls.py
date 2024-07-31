from django.urls import path
from . import views


urlpatterns = [
    path('<int:uid>/', views.UserView.as_view(), name='user'),
    path('<int:uid>/api/get_user_info/', views.get_user_info, name='get-user-info'),
    path('api/update_user_signature/', views.update_user_signature, name='update-user-signature'),
    path('api/upload_user_topImage/', views.upload_user_topImage, name='upload-user-topImage'),
    path('api/upload_user_page/', views.upload_user_page, name='upload-user-page'),
    path('<int:uid>/api/get_user_topImage/', views.get_user_topImage, name='get-user-topImage'),
    path('<int:uid>/api/get_user_page/', views.get_user_page, name='get-user-page'),
]
