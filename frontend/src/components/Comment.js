import React, { useState } from "react";
import { Link } from "react-router-dom";
import default_profile_pic from "./img/icons/default_profile_pic.png";

const Comment = (props) => {
  //console.log(props.comment)
  const [commentLikes, setCommentLikes] = useState(props.comment.likes);
  const [commentLiked, setCommentLiked] = useState(props.comment.liked);

  const getDate = () => {
    var post_created = new Date(props.comment.created_at);
    var today = new Date();
    var differnce_in_time = today.getTime() - post_created.getTime();
    var differnce_in_minute = Math.round(differnce_in_time / (1000 * 60));
    var differnce_in_hour = Math.round(differnce_in_time / (1000 * 3600));
    var differnce_in_day = Math.round(differnce_in_time / (1000 * 3600 * 24));
    var differnce_in_month = Math.round(
      differnce_in_time / (1000 * 3600 * 24 * 30)
    );
    var differnce_in_year = Math.round(
      differnce_in_time / (1000 * 3600 * 24 * 365)
    );

    if (differnce_in_year > 0) {
      if (differnce_in_year > 1) {
        return <p className="comment_time">{differnce_in_year}y</p>;
      } else {
        return <p className="comment_time">{differnce_in_year}y</p>;
      }
    } else if (differnce_in_month > 0) {
      if (differnce_in_month > 1) {
        return <p className="comment_time">{differnce_in_month}mo</p>;
      } else {
        return <p className="comment_time">{differnce_in_month}mo</p>;
      }
    } else if (differnce_in_day > 0) {
      if (differnce_in_day > 1) {
        return <p className="comment_time">{differnce_in_day}d</p>;
      } else {
        return <p className="comment_time">{differnce_in_day}d</p>;
      }
    } else if (differnce_in_hour > 0) {
      if (differnce_in_hour > 1) {
        return <p className="comment_time">{differnce_in_hour}h</p>;
      } else {
        return <p className="comment_time">{differnce_in_hour}h</p>;
      }
    } else {
      if (differnce_in_minute > 1) {
        return <p className="comment_time">{differnce_in_minute}m</p>;
      } else {
        return <p className="comment_time">1m</p>;
      }
    }
  };

  const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const likeHandler = (e) => {
    e.preventDefault();
    var csrftoken = getCookie("csrftoken");
    const url = "http://192.168.0.103:8000/api";
    fetch(`${url}/comment/${props.comment.id}/${props.userId}/like`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ like: true }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if (data === "Liked successfully") {
          setCommentLiked(true);
          setCommentLikes((commentLiked) => commentLiked + 1);
        }
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
  };
  const unlikeHandler = (e) => {
    e.preventDefault();
    var csrftoken = getCookie("csrftoken");
    const url = "http://192.168.0.103:8000/api";
    fetch(
      `${url}/comment/${props.comment.id}/${props.userId}/like`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ like: false }),
      }
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if (data === "Unliked successfully") {
          setCommentLiked(false);
          setCommentLikes((commentLiked) => commentLiked - 1);
        }
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
  };

  return (
    <div className="comment">
      <div className="userinfo_comment">
        <div className="username_pic comment_profile">
          <img src={default_profile_pic} className="profile-pic" alt="" />
          <Link to={`/user/${props.comment.username}`} className="username">
            <p>@{props.comment.username}</p>
          </Link>
        </div>
        <div className="comment_info">
          {getDate()}

          {commentLiked ? (
            <button onClick={unlikeHandler}>Unlike</button>
          ) : (
            <button onClick={likeHandler}>Like</button>
          )}
          <p className="comment_likes">
            {commentLikes} <span className="likes_word">likes</span>
          </p>
          <div className="extragap"></div>
        </div>
      </div>
      <p className="comment_content"> {props.comment.content} </p>
    </div>
  );
};
export default Comment;
