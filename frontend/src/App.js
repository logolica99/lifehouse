import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Login from './components/Login';
import Main from './components/Main'



function App() {
    useEffect(() => {
        getIsLogged();
    }, []);
    const [posts, setPosts] = useState([]);

    const [username, setUsername] = useState('');
    const [isLogged, setIsLogged] = useState('');
    useEffect(() => {
        fetchPosts();
        saveIsLogged();
    }, [isLogged]);

    const saveIsLogged = () => {
        localStorage.setItem('isLogged', isLogged);
        localStorage.setItem('username', username);
    };

    const getIsLogged = () => {
        if (localStorage.getItem('isLogged') === null) {
            localStorage.setItem('isLogged', "false");
            localStorage.setItem('username', '');

        } else {
            setIsLogged(localStorage.getItem('isLogged'));
            setUsername(localStorage.getItem('username'))
        }
    };

    const fetchPosts = async () => {
        const data = await fetch(
            `http://127.0.0.1:8000/api/following_posts/${username}`
        );

        const post = await data.json();
        setPosts(post);
        console.log(post);
    };

    return (


            <div className='App'>
                <Main isLogged={isLogged} username={username} setUsername={setUsername} setIsLogged={setIsLogged}/>
            </div>
       
    );
}

export default App;
