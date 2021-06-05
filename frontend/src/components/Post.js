import React, { useState, useEffect } from 'react';

const Post = (props) =>{
  // console.log(props.post)

    const [liked,setLiked] = useState(props.post.liked);
    const [likes, setLikes] = useState(props.post.likes)
 

   const getCookie = (name) =>{
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    const likeHandler = (e) =>{
        e.preventDefault();
        var csrftoken = getCookie('csrftoken')
        var url = `http://127.0.0.1:8000/api/post/${props.post.id}/${props.userId}/like`
        fetch(url,{
            'method':"POST",
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken':csrftoken,
            },
            body:JSON.stringify({'like':true})

        }).then( data => data.json())
        .then(
            data => {
                console.log(data)
                if(data==="Liked successfully"){
                    setLiked(true);
                    setLikes(likes=>likes+1)
               
                }

            }
          ).catch(function(error){
            console.log('ERROR:', error)
          })


    }

    const unlikeHandler = (e) =>{
        e.preventDefault();
        var csrftoken = getCookie('csrftoken')
        var url = `http://127.0.0.1:8000/api/post/${props.post.id}/${props.userId}/like`
        fetch(url,{
            'method':"POST",
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken':csrftoken,
            },
            body:JSON.stringify({'like':false})

        }).then(data=>data.json())
        .then(
            data =>{
                console.log(data)
                if(data==="Unliked successfully"){
                    setLiked(false)
                    setLikes(likes => likes-1)
           
                }
            }
        ).catch(error =>{
            console.log("ERROR",error)
        })


    }


    return(
        <div>
            <hr/>
            <h3>@{props.post.username}</h3>
            <p>{props.post.content}</p>
            <p><b>Likes:</b> {likes}</p>
            {liked   ? <button onClick={unlikeHandler}> Unlike </button> : <button onClick={likeHandler}> Like </button>}

          
            
            <hr/>
        </div>
    )
}
export default Post;