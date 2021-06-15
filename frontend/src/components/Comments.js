import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import CreateComment from './CreateComment';

const Comments = (props) => {
    useEffect(() => {
        fetchComments();
    });

    const [comments, setComments] = useState([]);

    const fetchComments = () => {
        props.posts.forEach((post) => {
            // console.log(post.id)
            if (post.id === parseInt(props.comment_id)) {
                setComments(post.comments);
                //  console.log(post.comments)
            }
        });
    };

    return (
        <div>
          
            <CreateComment
                
                userId={props.userId}
                postId={props.comment_id}
                setCommentSubmit={props.setCommentSubmit}
            />
            {comments.map((comment) => {
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
};
export default Comments;
