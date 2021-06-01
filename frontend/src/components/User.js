import React, { useState, useEffect } from 'react';
import Post from './Post'

const User= (props) =>{

    useEffect(()=>{
        fetchUserPosts();
    },[props.username])
    const [userPosts, setUserPosts] = useState([]);


    const fetchUserPosts = async () => {
        const data = await fetch(
            `http://127.0.0.1:8000/api/user_specific_posts/${props.username}`
        );

        const post = await data.json();
     
        setUserPosts(post)
        console.log(userPosts);
    };
    


    return(
        <div>
     
             <p>Username: {props.userData.username}</p>
            
             <p>{props.userData.first_name} {props.userData.last_name}</p>
            <h3>Followers: {props.followers}</h3>
            <h3>Following: {props.following}</h3> 
           {userPosts.map(post=>{
                return(
                    <Post username={post.username} content={post.content} key={post.id} likes={post.likes}/>
                )
            })}
        </div>

    )
}

export default User;