import React, { useState } from 'react';

const CreatePost = (props) => {
    const [postData, setPostData] = useState('');
    const postFormHandler = (e) => {
        setPostData(e.target.value);
    };

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

    const createPostFormHandler = (e) => {
        e.preventDefault();

        var csrftoken = getCookie('csrftoken');
        const url = "http://192.168.0.103:8000/api";
        fetch(`${url}/posts/create/${props.userId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({ content: postData }),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
            })
            .catch(function (error) {
                console.log('ERROR:', error);
            });
        setPostData('');
        props.setPostSubmit(bleh=>bleh+1);
    };
    return (
        <div >
            <hr />

            <form onSubmit={createPostFormHandler}>
                <input
                    type='text'
                    value={postData}
                    onChange={postFormHandler}
                />
                  <button type="submit">Post</button>
            </form>
            <hr />
        </div>
    );
};
export default CreatePost;
