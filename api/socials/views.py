from django.contrib.auth import authenticate, login, logout
from django.db import connections
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.core import serializers as django_serializer
from django.contrib.auth.decorators import login_required
from django.urls import reverse
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from .models import *


@api_view(['GET'])
def apiOverview(request):

    api_urls = {

        'User Data': '/user/<str:username>',
        'Following Posts': '/following_posts',
        'Post Detail': '/post/<str:id>',
        "Create Post": '/posts/create',
        "Like/Unlike Post": '/post/<str:id>/like',
        'Comment on a post': '/post/<str:id>/comment',
        'Like/Unlike comment': '/comment/<str:id>/like',
        'Follow/Unfollow': '/follow/<str:usernmae>'



    }

    return Response(api_urls)


@api_view(['GET'])
def post_detail(request, id, request_user_id):
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
        Post_like_model.objects.get(user=User.objects.get(
            id=request_user_id), post=post)
    except:
        post_liked = False

    data["liked"] = post_liked

    comments = Post_comment_model.objects.filter(post=post)
    comments_json = json.loads(django_serializer.serialize('json', comments))
    comments_data = []
    for comment in comments_json:
        try:
            profile_pic = User.objects.get(
                id=comment["fields"]["user"]).profile_pic.url
        except:
            profile_pic = ""

        comment_liked = True
        try:
            Comment_like_model.objects.get(user=User.objects.get(
                id=request_user_id), comment=Post_comment_model.objects.get(id=comment["pk"]))
        except:
            comment_liked = False

        comments_data += [
            [
                {"id": comment["pk"]},
                {"username": User.objects.get(
                    id=comment["fields"]["user"]).username},
                {"profile_pic": profile_pic},
                {"content": comment["fields"]["content"]},
                {"created_at": comment["fields"]["created_at"]},
                {"likes": Post_comment_model.objects.get(
                    id=comment["pk"]).likes.all().count()},
                {"liked": comment_liked},
            ]
        ]

    data["comments"] = comments_data

    # print(comments_json)
    return Response(data)


@api_view(['GET'])
def following_posts(request, username):
    following_id = [User.objects.get(username=username).id]
    for follower in Follower_model.objects.all():
        if follower.following == User.objects.get(username=username):
            following_id.append(follower.user.id)
  
    all_posts = []
    for i in following_id:
        posts = Post.objects.filter(user=User.objects.get(id=i))
        posts_id = [l.id for l in posts]

        for id in posts_id:
            post = Post.objects.get(id=id)
            serializer = post_detail_serializer(post, many=False)
            data = serializer.data

            data["username"] = User.objects.get(id=data["user"]).username
            try:
                data["profile_pic"] = User.objects.get(
                    id=data["user"]).profile_pic.url
            except:
                data["profile_pic"] = ""
            try:
                data["likes"] = Post_like_model.objects.filter(
                    post=post).count()
            except:
                data["likes"] = 0

            post_liked = True
            try:
                Post_like_model.objects.get(user=User.objects.get(
                    username=username), post=post)
            except:
                post_liked = False

            data["liked"] = post_liked

            comments = Post_comment_model.objects.filter(post=post)
            comments_json = json.loads(
                django_serializer.serialize('json', comments))
            comments_data = []
            for comment in comments_json:
                try:
                    profile_pic = User.objects.get(
                        id=comment["fields"]["user"]).profile_pic.url
                except:
                    profile_pic = ""

                comment_liked = True
                try:
                    Comment_like_model.objects.get(user=User.objects.get(
                        username=username), comment=Post_comment_model.objects.get(id=comment["pk"]))
                except:
                    comment_liked = False

                comments_data += [
                    [
                        {"id": comment["pk"]},
                        {"username": User.objects.get(
                            id=comment["fields"]["user"]).username},
                        {"profile_pic": profile_pic},
                        {"content": comment["fields"]["content"]},
                        {"created_at": comment["fields"]["created_at"]},
                        {"likes": Post_comment_model.objects.get(
                            id=comment["pk"]).likes.all().count()},
                        {"liked": comment_liked},
                    ]
                ]

            data["comments"] = comments_data
            all_posts.append(data)

    return Response(all_posts)


@api_view(['GET'])
def user_specific_posts(request, username):
    posts = Post.objects.filter(user=User.objects.get(username=username))
    posts_id = [l.id for l in posts]

    all_posts = []
    for id in posts_id:
        post = Post.objects.get(id=id)
        serializer = post_detail_serializer(post, many=False)
        data = serializer.data

        data["username"] = User.objects.get(id=data["user"]).username
        try:
            data["profile_pic"] = User.objects.get(
                id=data["user"]).profile_pic.url
        except:
            data["profile_pic"] = ""
        try:
            data["likes"] = Post_like_model.objects.filter(
                post=post).count()
        except:
            data["likes"] = 0

        post_liked = True
        try:
            Post_like_model.objects.get(user=User.objects.get(
                username=username), post=post)
        except:
            post_liked = False

        data["liked"] = post_liked

        comments = Post_comment_model.objects.filter(post=post)
        comments_json = json.loads(
            django_serializer.serialize('json', comments))
        comments_data = []
        for comment in comments_json:
            try:
                profile_pic = User.objects.get(
                    id=comment["fields"]["user"]).profile_pic.url
            except:
                profile_pic = ""

            comment_liked = True
            try:
                Comment_like_model.objects.get(user=User.objects.get(
                    username=username), comment=Post_comment_model.objects.get(id=comment["pk"]))
            except:
                comment_liked = False

            comments_data += [
                [
                    {"id": comment["pk"]},
                    {"username": User.objects.get(
                        id=comment["fields"]["user"]).username},
                    {"profile_pic": profile_pic},
                    {"content": comment["fields"]["content"]},
                    {"created_at": comment["fields"]["created_at"]},
                    {"likes": Post_comment_model.objects.get(
                        id=comment["pk"]).likes.all().count()},
                    {"liked": comment_liked},
                ]
            ]

        data["comments"] = comments_data
        all_posts.append(data)
    return Response(all_posts)


@api_view(['GET'])
def user_data(request, username, request_user_id):

    user = User.objects.get(username=username)
    logged_in = User.objects.get(id=int(request_user_id))

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
    if int(request_user_id) == user.id:
        can_follow = False
    data["can_follow"] = can_follow

    already_following = True
    try:
        Follower_model.objects.get(user=user, following=logged_in)
    except:
        already_following = False

    data["already_following"] = already_following

    return Response(data)


@api_view(['POST'])
def create_post(request, request_user_id):
    data = request.data
    post = Post(user=User.objects.get(
        id=request_user_id), content=data['content'])
    post.save()
    return Response("Item added successfully")


@api_view(['POST'])
def like_post(request, id, request_user_id):
    post = Post.objects.get(id=id)
    user = User.objects.get(id=request_user_id)

    if request.data["like"]:
        try:
            Post_like_model.objects.get(post=post, user=user)
            return Response("can't like twice")
        except:
            like = Post_like_model(post=post, user=user)
            like.save()
            if post.user.username != user.username:
                try:
                    pro_pic = user.profile_pic.url
                except:
                    pro_pic = ''
                notification = Notification_model(
                    user=post.user, username=user.username, pro_pic=pro_pic, content="liked your post")
                notification.save()
            return Response("Liked successfully")
    else:
        unlike = Post_like_model.objects.get(post=post, user=user)
        unlike.delete()
        return Response("Unliked successfully")


@api_view(['POST'])
def create_comment(request, id, request_user_id):
    user = User.objects.get(id=request_user_id)
    post = Post.objects.get(id=id)
    content = request.data["content"]
    comment = Post_comment_model(user=user, post=post, content=content)
    comment.save()
    if post.user.username != user.username:
        try:
            pro_pic = user.profile_pic.url
        except:
            pro_pic = ''
        notification = Notification_model(
            user=post.user, username=user.username, pro_pic=pro_pic, content="commented on your post")
        notification.save()
    return Response("commented successfully")


@api_view(['POST'])
def like_comment(request, id, request_user_id):
    comment = Post_comment_model.objects.get(id=id)
    user = User.objects.get(id=request_user_id)

    if request.data["like"]:
        try:
            Comment_like_model.objects.get(comment=comment, user=user)
            return Response("can't like twice")
        except:
            like = Comment_like_model(comment=comment, user=user)
            like.save()

            if comment.user.username != user.username:
                try:
                    pro_pic = user.profile_pic.url
                except:
                    pro_pic = ''
                notification = Notification_model(
                    user=comment.user, username=user.username, pro_pic=pro_pic, content="liked your comment")
                notification.save()
            return Response("Liked successfully")
    else:
        unlike = Comment_like_model.objects.get(comment=comment, user=user)
        unlike.delete()
        return Response("Unliked successfully")


@api_view(['POST'])
def follow_unfollow(request, username, request_user_id):
    following = User.objects.get(id=request_user_id)
    user = User.objects.get(username=username)

    if request.data["follow"]:
        try:
            Follower_model.objects.get(following=following, user=user)
            return Response("Already following")
        except:

            follow = Follower_model(following=following, user=user)
            follow.save()
            try:
                pro_pic = following.profile_pic.url
            except:
                pro_pic = ''
            notification = Notification_model(
                user=user, username=following.username, pro_pic=pro_pic, content="followed you")
            notification.save()
            return Response("followed successfully")
    else:
        unfollow = Follower_model.objects.get(following=following, user=user)
        unfollow.delete()
        return Response("unfollowed successfully")


@api_view(['GET'])
def notifications(request, username):
    user = User.objects.get(username=username)
    notification = Notification_model.objects.filter(user=user)
    serializer = notifications_serializer(notification, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def login_view(request):

    if request.method == "POST":

        username = request.data["username"]
        password = request.data["password"]

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return Response({
                'message': "Logged in Successfully",
                'user_id': User.objects.get(username=username).id
            }
            )

        else:
            return Response(
                "Invalid username and/or password."
            )


@api_view(['GET'])
def logout_view(request):
    print(dir(request))
    logout(request)
    return Response("logged out successfully")


@api_view(['POST'])
def register(request):
    if request.method == "POST":
        username = request.data["username"]
        email = request.data["email"]

        # Ensure password matches confirmation
        password = request.data["password"]
        confirmation = request.data["confirmation"]
        first_name = request.data["first_name"]
        last_name = request.data["last_name"]
        if password != confirmation:
            return Response(
                "Passwords must match."
            )

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            login(request, user)
            return Response("account created successfully")
        except IntegrityError:
            return Response(
                "Username already taken."
            )
