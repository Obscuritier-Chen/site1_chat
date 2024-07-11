from django.urls import path
from . import views

urlpatterns = [
    path('<int:blog_id>', views.BlogDisplayView.as_view(), name='blog-display'),
    path('publish/', views.BlogPublishView.as_view(), name='blog-publish'),
    path('publish/blog_publish/', views.blog_publish, name='blog-publish-blog-publish'),
    path('<int:blog_id>/api/get_blog_data/', views.get_blog_data, name='get-blog-data'),
    path('<int:blog_id>/api/give_delete_like/', views.give_delete_like, name='give-delete-like'),
    path('<int:blog_id>/api/create_blog_comment/', views.create_blog_comment, name='create-blog-comment'),
]
