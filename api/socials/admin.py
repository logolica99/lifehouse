from django.contrib import admin
from .models import *


admin.site.register(User)
admin.site.register(Post)
admin.site.register(Post_like_model)
admin.site.register(Post_comment_model)
admin.site.register(Comment_like_model)
admin.site.register(Follower_model)
admin.site.register(Notification_model)
