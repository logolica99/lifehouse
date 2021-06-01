from django.urls import path
from . import views


urlpatterns = [
    path("register", views.register, name="register"),
    path("login", views.login_view, name="login"),
    path("logout",views.logout_view,name="logout"),
    path('', views.apiOverview, name="api-overview"),
    path('user/<str:username>/<str:request_user_id>', views.user_data, name="user_data"),
    path('post/<str:id>', views.post_detail, name="post_detail"),
    path('following_posts/<str:username>', views.following_posts, name="following_posts"),
    path('user_specific_posts/<str:username>', views.user_specific_posts),
    path('posts/create', views.create_post, name="create_post"),
    path("post/<str:id>/like", views.like_post, name="like_post"),
    path("post/<str:id>/comment", views.create_comment, name="comment"),
    path("comment/<str:id>/like", views.like_comment, name="like_comment"),
    path("follow/<str:username>", views.follow_unfollow),
    path("notifications/<str:username>", views.notifications)
]
