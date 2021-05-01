from django.urls import path
from . import views


urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('user/<str:username>', views.user_data, name="user_data"),
    path('post/<str:id>', views.post_detail, name="post_detail"),
    path('following_posts',views.following_posts,name="following_posts"),
]