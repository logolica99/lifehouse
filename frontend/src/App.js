import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Login from './components/Login';
import Main from './components/Main';

function App() {
    useEffect(() => {
        getIsLogged();
    }, []);

    const [posts, setPosts] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const[userData,setUserData] = useState([]);

    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [isLogged, setIsLogged] = useState('');
    const [followers,setFollowers]= useState('');
    const [following,setFollowing] = useState('');

    useEffect(() => {
        fetchPosts();
        fetchNotifications();
        fetchUserData();
        saveIsLogged();
    }, [isLogged]);

    const saveIsLogged = () => {
        localStorage.setItem('isLogged', isLogged);
        localStorage.setItem('username', username);
        localStorage.setItem('userId',userId)
    };

    const getIsLogged = () => {
        if (localStorage.getItem('isLogged') === null) {
            localStorage.setItem('isLogged', 'false');
            localStorage.setItem('username', '');
            localStorage.setItem('userId', '');
        } else {
            setIsLogged(localStorage.getItem('isLogged'));
            setUsername(localStorage.getItem('username'));
            setUserId(localStorage.getItem('userId'));
        }
    };

    const fetchPosts = async () => {
        const data = await fetch(
            `http://127.0.0.1:8000/api/following_posts/${username}`
        );

        const post = await data.json();
        setPosts(post);

        //  console.log(post);
    };

    const fetchNotifications = async () => {
        const data = await fetch(
            `http://127.0.0.1:8000/api/notifications/${username}`
        );

        const notification = await data.json();
        setNotifications(notification);
    };

    const fetchUserData = async () => {
        const data = await fetch(
            `http://127.0.0.1:8000/api/user/${username}/${userId}`
        );

        const user_data = await data.json();
        setFollowers(user_data.followers.length);
        setFollowing(user_data.following.length);
        setUserData(user_data);
      
    };

    return (
        <div className='App'>
            <Main
                isLogged={isLogged}
                posts={posts}
                username={username}
                setUsername={setUsername}
                setIsLogged={setIsLogged}
                notifications={notifications}
                userId={userId}
                setUserId={setUserId}
                userData={userData}
                followers={followers}
                following={following}
            />
        </div>
    );
}

export default App;
