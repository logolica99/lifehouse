from rest_framework import serializers
from .models import *


class user_data_serializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email","profile_pic"]

class post_detail_serializer(serializers.ModelSerializer):
    
    class Meta:
        model = Post
        fields = "__all__"

class notifications_serializer(serializers.ModelSerializer):


    class Meta:
        model = Notification_model
        fields = "__all__"