import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Comment = (props) => {
    // console.log(props.comment[4])
    const [commentLikes, setCommentLikes] = useState(props.comment[5].likes);
    const [commentLiked, setCommentLiked] = useState(props.comment[6].liked);

    const getDate = () => {
        var post_created = new Date(props.comment[4].created_at);
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

    const likeHandler = (e) => {
        e.preventDefault();
        var csrftoken = getCookie('csrftoken');
        fetch(
            `http://127.0.0.1:8000/api/comment/${props.comment[0].id}/${props.userId}/like`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({ like: true }),
            }
        )
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                if (data === 'Liked successfully') {
                    setCommentLiked(true);
                    setCommentLikes((commentLiked) => commentLiked + 1);
                }
            })
            .catch(function (error) {
                console.log('ERROR:', error);
            });
    };
    const unlikeHandler = (e) => {
        e.preventDefault();
        var csrftoken = getCookie('csrftoken');
        fetch(
            `http://127.0.0.1:8000/api/comment/${props.comment[0].id}/${props.userId}/like`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({ like: false }),
            }
        )
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                if (data === 'Unliked successfully') {
                    setCommentLiked(false);
                    setCommentLikes((commentLiked) => commentLiked - 1);
                }
            })
            .catch(function (error) {
                console.log('ERROR:', error);
            });
    };

    return (
        <div style={{ border: '1px solid black', width: '50%' }}>
            <Link to={`/user/${props.comment[1].username}`}>
                <p style={{ color: 'green', fontWeight: 'bold' }}>
                    
                    @{props.comment[1].username}
                </p>
            </Link>
            <p style={{ color: 'red' }}> {props.comment[3].content} </p>
            <p>Likes: {commentLikes}</p>
            {commentLiked ? (
                <button onClick={unlikeHandler}>Unlike</button>
            ) : (
                <button onClick={likeHandler}>Like</button>
            )}
            {getDate()}
        </div>
    );
};
export default Comment;
