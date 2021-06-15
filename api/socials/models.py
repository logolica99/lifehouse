from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    profile_pic = models.ImageField(null=True,blank=True)


class Post(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="posts")
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField(blank=False)


class Post_like_model(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="liked_posts")
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="likes")


class Post_comment_model(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="commented_posts")
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="comments")
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField(blank=False)


class Comment_like_model(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="liked_comments")
    comment = models.ForeignKey(
        Post_comment_model, on_delete=models.CASCADE, related_name="likes")
class Follower_model(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    following = models.ForeignKey(User,on_delete=models.CASCADE,related_name="following") 

class Notification_model(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notifications")
    pro_pic = models.TextField(blank=True)
    username = models.TextField(blank=False)
    content = models.TextField(blank=False)
    read = models.BooleanField(default=False)

