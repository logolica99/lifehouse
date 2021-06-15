import React, { useState, useEffect } from 'react';
import Post from './Post';

const User = (props) => {
    const getCookie = (name) => {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === name + '=') {
                    cookieValue = decodeURIComponent(
                        cookie.substring(name.length + 1)
                    );
                    break;
                }
            }
        }
        return cookieValue;
    };

    useEffect(()=>{
        fetchUserData();
        

    },[])
    // useEffect(()=>{
    //     setAlreadyFollowing(userData.already_following);
    // })
    useEffect(() => {
        fetchUserPosts();
    }, [props.username,props.commentSubmit]);

    const [userPosts, setUserPosts] = useState([]);
    const [followers,setFollowers]= useState('');
    const [following,setFollowing] = useState('');
    const[userData,setUserData] = useState([]);
    
    const fetchUserPosts = async () => {
        const data = await fetch(
            `http://127.0.0.1:8000/api/user_specific_posts/${props.username}`
        );
        
        const post = await data.json();

        setUserPosts(post);
        //console.log(post);
    };
    const [already_following,setAlreadyFollowing] = useState(userData.already_following);
    
    const fetchUserData = async () => {
        
        const data = await fetch(
            `http://127.0.0.1:8000/api/user/${props.username}/${props.userId}`
            );
            
            const user_data = await data.json();
        console.log(user_data)
        setFollowers(user_data.followers.length);
        setFollowing(user_data.following.length);
        setUserData(user_data);
        setAlreadyFollowing(user_data.already_following)
        
    };
    

    const followButtonHandler = (e) =>{
        e.preventDefault();
        var csrftoken = getCookie('csrftoken');
        fetch(`http://127.0.0.1:8000/api/follow/${userData.username}/${props.userId}`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({follow:true})
        }).then((data)=>data.json())
        .then((data)=>{
            console.log(data);
            if(data==="followed successfully"){
                setAlreadyFollowing(true);
                setFollowers(followers=>followers+1)
            }
        })
        .catch(function (error) {
            console.log('ERROR:', error);
        });

    }
    const unfollowButtonHandler = (e) =>{
        e.preventDefault();
        var csrftoken = getCookie('csrftoken');
        fetch(`http://127.0.0.1:8000/api/follow/${userData.username}/${props.userId}`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({follow:false})
        }).then((data)=>data.json())
        .then((data)=>{
            console.log(data);
            if(data==="unfollowed successfully"){
                setAlreadyFollowing(false)
                setFollowers(followers=>followers-1)
            }
        })
        .catch(function (error) {
            console.log('ERROR:', error);
        });

    }




    const followButton = () =>{
        if(userData.can_follow){
            if(already_following){
                return(
                    <button onClick={unfollowButtonHandler}>Unfollow</button>
                )
            }else{
                return(
                    <button onClick={followButtonHandler}>Follow</button>
                )
            }
        }
    }









    return (
        <div>
           

            <p>
                {userData.first_name} {userData.last_name}
            </p>
            <p>@{userData.username}</p>

            {followButton()}

            <h3>Followers: {followers}</h3>
            <h3>Following: {following}</h3>
            {userPosts.map((post) => {
                return (
                    <div>
                        <Post post={post} key={post.id} userId={props.userId} />

                        
                    </div>
                );
            })}
        </div>
    );
};

export default User;
