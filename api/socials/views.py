from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers as django_serializer
from django.contrib.auth.decorators import login_required
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from .models import *


@api_view(['GET'])
def apiOverview(request):

    api_urls = {

        'User Data': '/user/<str:username>',
        'Following Posts': '/posts/following',
        'Post Detail': '/post/<str:id>',
        "Create Post": '/post/create',
        "Like/Unlike Post":'/post/<str:id>/like',
        'Comment on a post':'/post/<str:id>/comment',
        'Like a comment':'/comment/<str:id>/like',



    }

    return Response(api_urls)


@api_view(['GET'])
@login_required
def post_detail(request, id):
    post = Post.objects.get(id=id)
    serializer = post_detail_serializer(post, many=False)
    data = serializer.data

    data["username"] = User.objects.get(id=data["user"]).username
    try:
        data["profile_pic"] = User.objects.get(id=data["user"]).profile_pic.url
    except:
        data["profile_pic"] = ""
    try:
        data["likes"] = Post_like_model.objects.filter(post=post).count()
    except:
        data["likes"] = 0



    post_liked = True
    try:
        Post_like_model.objects.get(user = User.objects.get(id=request.user.id),post=post_liked)
    except:
        post_liked = False

    data["liked"] = post_liked

    comments = Post_comment_model.objects.filter(post=post)
    comments_json = json.loads(django_serializer.serialize('json', comments))
    comments_data = []
    for comment in comments_json:
        try:
            profile_pic = User.objects.get(id=comment["fields"]["user"]).profile_pic.url
        except:
            profile_pic=""


        comment_liked = True
        try:
            Comment_like_model.objects.get(user = User.objects.get(id=request.user.id),comment=Post_comment_model.objects.get(id=comment["pk"]))
        except:
            comment_liked = False


        comments_data += [
            [
                {"id": comment["pk"]}, 
                {"username": User.objects.get(id=comment["fields"]["user"]).username},
                {"profile_pic":profile_pic},
                {"content":comment["fields"]["content"]}, 
                {"created_at":comment["fields"]["created_at"]}, 
                {"likes":Post_comment_model.objects.get(id=comment["pk"]).likes.all().count()},
                {"liked":comment_liked},
            ]
        ]
        
    data["comments"] = comments_data

    #print(comments_json)
    return Response(data)



@api_view(['GET'])
@login_required
def following_posts(request):
    following_id=[]
    for follower in Follower_model.objects.all():
        if follower.following == User.objects.get(id=request.user.id):
            following_id.append(follower.user.id)
    
    for i in following_id:
        posts = Post.objects.filter(user=User.objects.get(id=i))
        posts_id = [i.id for i in posts]
        all_posts = []
        for id in posts_id:
            post = Post.objects.get(id=id)
            serializer = post_detail_serializer(post, many=False)
            data = serializer.data

            data["username"] = User.objects.get(id=data["user"]).username
            try:
                data["profile_pic"] = User.objects.get(id=data["user"]).profile_pic.url
            except:
                data["profile_pic"] = ""
            try:
                data["likes"] = Post_like_model.objects.filter(post=post).count()
            except:
                data["likes"] = 0



            post_liked = True
            try:
                Post_like_model.objects.get(user = User.objects.get(id=request.user.id),post=post_liked)
            except:
                post_liked = False

            data["liked"] = post_liked

            comments = Post_comment_model.objects.filter(post=post)
            comments_json = json.loads(django_serializer.serialize('json', comments))
            comments_data = []
            for comment in comments_json:
                try:
                    profile_pic = User.objects.get(id=comment["fields"]["user"]).profile_pic.url
                except:
                    profile_pic=""


                comment_liked = True
                try:
                    Comment_like_model.objects.get(user = User.objects.get(id=request.user.id),comment=Post_comment_model.objects.get(id=comment["pk"]))
                except:
                    comment_liked = False


                comments_data += [
                    [
                        {"id": comment["pk"]}, 
                        {"username": User.objects.get(id=comment["fields"]["user"]).username},
                        {"profile_pic":profile_pic},
                        {"content":comment["fields"]["content"]}, 
                        {"created_at":comment["fields"]["created_at"]}, 
                        {"likes":Post_comment_model.objects.get(id=comment["pk"]).likes.all().count()},
                        {"liked":comment_liked},
                    ]
                ]
                
            data["comments"] = comments_data
            all_posts.append(data)


    return Response(all_posts)




@api_view(['GET'])
@login_required
def user_data(request, username):

    user = User.objects.get(username=username)
    logged_in = User.objects.get(id=request.user.id)

    #data["followers"] = Follower_model.objects.filter(user=user).count()
    #data["following"] = user.following.count()
    serializer = user_data_serializer(user, many=False)
    data = serializer.data

    following = user.following.all()
    following_json = json.loads(django_serializer.serialize('json', following))
    following_data = []
    for following_user in following_json:
        following_data.append({"id": following_user["pk"]})
    data["following"] = following_data

    followers = Follower_model.objects.filter(user=user)
    followers_json = django_serializer.serialize('json', followers)
    followers_json = json.loads(followers_json)
    followers_data = []
    for follower in followers_json:

        followers_data.append({"id": follower["pk"]})

    data["followers"] = followers_data

    can_follow = True
    if request.user.id == user.id:
        can_follow = False
    data["can_follow"] = can_follow

    already_following = True
    try:
        Follower_model.objects.get(user=user, following=logged_in)
    except:
        already_following = False

    data["already_following"] = already_following

    return Response(data)
