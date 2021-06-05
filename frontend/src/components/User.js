import React, { useState, useEffect } from 'react';
import Post from './Post';
import Comment from './Comment';
import CreateComment from './CreateComment';

const User = (props) => {
    useEffect(() => {
        fetchUserPosts();
    }, [props.username,props.commentSubmit]);
    const [userPosts, setUserPosts] = useState([]);

    const fetchUserPosts = async () => {
        const data = await fetch(
            `http://127.0.0.1:8000/api/user_specific_posts/${props.username}`
        );

        const post = await data.json();

        setUserPosts(post);
        //console.log(post);
    };

    return (
        <div>
           
            <p>Username: {props.userData.username}</p>

            <p>
                {props.userData.first_name} {props.userData.last_name}
            </p>
            <h3>Followers: {props.followers}</h3>
            <h3>Following: {props.following}</h3>
            {userPosts.map((post) => {
                return (
                    <div>
                        <Post post={post} key={post.id} userId={props.userId} />
                        <CreateComment
                            userId={props.userId}
                            postId={post.id}
                            setCommentSubmit={props.setCommentSubmit}
                        />
                        <h5>Comments:</h5>
                        {post.comments.map((comment) => {
                            return (
                                <div>
                                    <Comment
                                        key={comment[0].id}
                                        comment={comment}
                                        userId={props.userId}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default User;
