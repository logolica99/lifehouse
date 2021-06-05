import React, { useState } from 'react';


const Comment = (props) => {
    console.log()
    const [commentLikes,setCommentLikes] = useState(props.comment[5].likes);
    const [commentLiked, setCommentLiked] = useState(props.comment[6].liked);

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
        var csrftoken = getCookie('csrftoken');
        fetch(`http://127.0.0.1:8000/api/comment/${props.comment[0].id}/${props.userId}/like`,{
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
                    setCommentLiked(true)
                    setCommentLikes(commentLiked=>commentLiked+1)
               
                }

            }
          ).catch(function(error){
            console.log('ERROR:', error)
          })
    }
    const unlikeHandler = (e) =>{
        e.preventDefault();
        var csrftoken = getCookie('csrftoken');
        fetch(`http://127.0.0.1:8000/api/comment/${props.comment[0].id}/${props.userId}/like`,{
            'method':"POST",
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken':csrftoken,
            },
            body:JSON.stringify({'like':false})
        }).then( data => data.json())
        .then(
            data => {
                console.log(data)
                if(data==="Unliked successfully"){
                    setCommentLiked(false)
                    setCommentLikes(commentLiked=>commentLiked-1)
               
                }

            }
          ).catch(function(error){
            console.log('ERROR:', error)
          })
    }
    
    return (
        <div style={{border:"1px solid black",width:"50%"}}>
      
               
                <p style={{ color: 'green', fontWeight: 'bold' }}> @{props.comment[1].username} </p>
                <p style={{ color: 'red', }}> {props.comment[3].content} </p>
                <p>Likes: {commentLikes}</p>
                {commentLiked? <button onClick={unlikeHandler}>Unlike</button>:<button onClick={likeHandler}>Like</button>}

  
        </div>
    );
};
export default Comment;
