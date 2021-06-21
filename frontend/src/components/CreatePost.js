import React, { useState } from "react";
import { Link } from "react-router-dom";
import default_profile_pic from "./img/icons/default_profile_pic.png";

const CreatePost = (props) => {
  const [postData, setPostData] = useState("");
  const postFormHandler = (e) => {
    setPostData(e.target.value);
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

  const createPostFormHandler = (e) => {
    e.preventDefault();

    var csrftoken = getCookie("csrftoken");
    const url = "http://192.168.0.103:8000/api";
    fetch(`${url}/posts/create/${props.userId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ content: postData }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
    setPostData("");
    props.setPostSubmit((bleh) => bleh + 1);
  };
  return (
    <div class="newpost">
      <div className="username_pic create-post">
        <img className="profile-pic" src={default_profile_pic} alt="" />
        <Link to={`/user/${props.username}`} className="username">
                <p>@{props.username}</p>
            </Link>
      </div>
      <form onSubmit={createPostFormHandler}>
        <textarea placeholder="What's happening..." type="text" value={postData} onChange={postFormHandler} ></textarea>
        <div className="postButton">
        <button className="red-button" type="submit">
          Post
        </button>
        </div>
      </form>
    </div>
  );
};
export default CreatePost;
