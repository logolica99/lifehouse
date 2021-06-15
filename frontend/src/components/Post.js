import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Post = (props) => {
    //console.log(props.post)

    const getDate = () => {
        var post_created = new Date(props.post.created_at);
        var today = new Date();
        var differnce_in_time = today.getTime() - post_created.getTime();
        var differnce_in_minute = Math.round(differnce_in_time / (1000 * 60));
        var differnce_in_hour = Math.round(differnce_in_time / (1000 * 3600));
        var differnce_in_day = Math.round(
            differnce_in_time / (1000 * 3600 * 24)
        );
        var differnce_in_month = Math.round(
            differnce_in_time / (1000 * 3600 * 24 * 30)
        );
        var differnce_in_year = Math.round(
            differnce_in_time / (1000 * 3600 * 24 * 365)
        );

        if (differnce_in_year > 0) {
            if (differnce_in_year > 1) {
                return <p>{differnce_in_year} YEARS AGO</p>;
            } else {
                return <p>{differnce_in_year} YEAR AGO</p>;
            }
        } else if (differnce_in_month > 0) {
            if (differnce_in_month > 1) {
                return <p>{differnce_in_month} MONTHS AGO</p>;
            } else {
                return <p>{differnce_in_month} MONTH AGO</p>;
            }
        } else if (differnce_in_day > 0) {
            if (differnce_in_day > 1) {
                return <p>{differnce_in_day} DAYS AGO</p>;
            } else {
                return <p>{differnce_in_day} DAY AGO</p>;
            }
        } else if (differnce_in_hour > 0) {
            if (differnce_in_hour > 1) {
                return <p>{differnce_in_hour} HOURS AGO</p>;
            } else {
                return <p>{differnce_in_hour} HOUR AGO</p>;
            }
        } else {
            if (differnce_in_minute > 1) {
                return <p>{differnce_in_minute} MINUTES AGO</p>;
            } else {
                return <p>1 MINUTE AGO</p>;
            }
        }
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
    const [liked, setLiked] = useState(props.post.liked);
    const [likes, setLikes] = useState(props.post.likes);
    const likeHandler = (e) => {
        e.preventDefault();
        var csrftoken = getCookie('csrftoken');
        var url = `http://127.0.0.1:8000/api/post/${props.post.id}/${props.userId}/like`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({ like: true }),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                if (data === 'Liked successfully') {
                    setLiked(true);
                    setLikes((likes) => likes + 1);
                }
            })
            .catch(function (error) {
                console.log('ERROR:', error);
            });
    };

    const unlikeHandler = (e) => {
        e.preventDefault();
        var csrftoken = getCookie('csrftoken');
        var url = `http://127.0.0.1:8000/api/post/${props.post.id}/${props.userId}/like`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({ like: false }),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                if (data === 'Unliked successfully') {
                    setLiked(false);
                    setLikes((likes) => likes - 1);
                }
            })
            .catch((error) => {
                console.log('ERROR', error);
            });
    };

    return (
        <div>
            <hr />
            <Link to={`/user/${props.post.username}`}>
                <h3>@{props.post.username}</h3>
            </Link>
            <p>{props.post.content}</p>
            <p>
                <b>Likes:</b> {likes}
            </p>
            {liked ? (
                <button onClick={unlikeHandler}> Unlike </button>
            ) : (
                <button onClick={likeHandler}> Like </button>
            )}
            <Link to={`/comments/${props.post.id}`}>
                <p>comments</p>
            </Link>
            {getDate()}

            <hr />
        </div>
    );
};
export default Post;
