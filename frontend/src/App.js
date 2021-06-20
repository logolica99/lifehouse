import "./App.css";
import "./scss/styles.css"
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Main from "./components/Main";

function App() {
  useEffect(() => {
    getIsLogged();
  }, []);

  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [commentSubmit, setCommentSubmit] = useState(0);
  const [postSubmit, setPostSubmit] = useState(0);

  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [isLogged, setIsLogged] = useState("");

  useEffect(() => {
    fetchPosts();
    fetchNotifications();
    //   fetchUserData();
    saveIsLogged();
  }, [isLogged, postSubmit, commentSubmit]);

  const saveIsLogged = () => {
    localStorage.setItem("isLogged", isLogged);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);
  };

  const getIsLogged = () => {
    if (localStorage.getItem("isLogged") === null) {
      localStorage.setItem("isLogged", "false");
      localStorage.setItem("username", "");
      localStorage.setItem("userId", "");
    } else {
      setIsLogged(localStorage.getItem("isLogged"));
      setUsername(localStorage.getItem("username"));
      setUserId(localStorage.getItem("userId"));
    }
  };

  const fetchPosts = async () => {
    const url = "http://192.168.0.103:8000/api";
    const data = await fetch(
      `${url}/following_posts/${username}`
    );

    const post = await data.json();
    setPosts(post);

    //console.log(post);
  };

  const fetchNotifications = async () => {
    const url = "http://192.168.0.103:8000/api";
    const data = await fetch(
      `${url}/notifications/${username}`
    );

    const notification = await data.json();
    setNotifications(notification);
  };

  return (
    <div className="App">
      <Main
        isLogged={isLogged}
        posts={posts}
        username={username}
        setUsername={setUsername}
        setIsLogged={setIsLogged}
        notifications={notifications}
        userId={userId}
        setUserId={setUserId}
        commentSubmit={commentSubmit}
        setCommentSubmit={setCommentSubmit}
        setPostSubmit={setPostSubmit}
      />
    </div>
  );
}

export default App;
