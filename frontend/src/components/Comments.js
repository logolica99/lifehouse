import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

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
    <div className="comment_page">
      <div className="comment_container">
        
        <CreateComment
          userId={props.userId}
          postId={props.comment_id}
          setCommentSubmit={props.setCommentSubmit}
          apiUrl={props.apiUrl}
        />
        {comments.map((comment) => {
          return (
            <Comment key={comment.id} comment={comment} userId={props.userId}  apiUrl={props.apiUrl}/>
          );
        })}
      </div>
    </div>
  );
};
export default Comments;
