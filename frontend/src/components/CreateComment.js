import React, { useState } from 'react';
import default_profile_pic from "./img/icons/default_profile_pic.png";


const CreateComment = (props) => {
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
    const [commentData, setCommentData] = useState('');

    const createCommentChangeHandler = (e) => {
        setCommentData(e.target.value);
    };

    const createCommentFormHandler =(e) =>{
        e.preventDefault();

        var csrftoken = getCookie('csrftoken');

        
        fetch(`${props.apiUrl}/post/${props.postId}/${props.userId}/comment`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body:JSON.stringify({content:commentData})
        })
        .then((data) => data.json())
        .then((data) => {
            console.log(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error);
        });
        setCommentData('');
        props.setCommentSubmit(bleh=>bleh+1)
    }

    return (
        <div className="create_new_comment">
            <img src={default_profile_pic} alt="" />
            <form onSubmit={createCommentFormHandler}>
                <input
                    type='text'
                    value={commentData}
                    onChange={createCommentChangeHandler}
                    placeholder="Add a comment..."
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default CreateComment;
