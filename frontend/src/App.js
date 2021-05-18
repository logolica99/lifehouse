import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
    useEffect(() => {
        fetchPosts();
    }, []);

    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const data = await fetch('http://127.0.0.1:8000/api/following_posts');
      
        console.log(data.status);
         // const posts = await data.json();
    };

    return (
        <Router>  
            <div className='App'>
                <Nav />
            </div>
        </Router>
    );
}

export default App;
