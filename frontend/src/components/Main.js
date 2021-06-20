import Login from './Login';
import Nav from './Nav';
import Homepage from './Homepage';
import Search from './Search';
import Notifications from './Notifications';
import Message from './Message';
import User from './User';
import Posts from './Posts';
import Comments from './Comments';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


const Main = (props) => {
    useEffect(() => {
        isLoggedView();
    }, [props.isLogged]);

    const logoutHandler = () => {
        props.setIsLogged(false);
    }; //component={Homepage}
    const isLoggedView = () => {
        if (props.isLogged === 'true') {
            return (
                <Router>
                    
                    <div>
                        <Nav username={props.username}/>
                        <div className="upper-gap"></div>
                        <Route
                            path='/'
                            exact
                            render={() => (
                                <Homepage
                                    posts={props.posts}
                                    userId={props.userId}
                                    setCommentSubmit={props.setCommentSubmit}
                                    setPostSubmit={props.setPostSubmit}
                                />
                            )}
                        />
                        <Route path='/search' exact component={Search} />
                        <Route
                            path='/notifications'
                            exact
                            render={() => (
                                <Notifications
                                    notifications={props.notifications}
                                />
                            )}
                        />
                        <Route path='/messages' exact component={Message} />
                        <Route
                            path='/User/:username'
                            exact
                            render={({ match }) => (
                                <User
                                    username={match.params.username}
                                    followers={props.followers}
                                    following={props.following}
                                  
                                    userId={props.userId}
                                    commentSubmit={props.commentSubmit}
                                    setCommentSubmit={props.setCommentSubmit}
                                />
                            )}
                        />
                        <Route
                            path='/comments/:id'
                            exact
                            render={({ match }) => (
                                <Comments
                                    posts={props.posts}
                                    comment_id={match.params.id}
                                    userId={props.userId}
                                    setCommentSubmit={props.setCommentSubmit}
                                />
                            )}
                        />
                        
                    
                    </div>
                   
                </Router>
            );
        }
        
        return (
         
                <Login
                    username={props.username}
                    setUsername={props.setUsername}
                    setIsLogged={props.setIsLogged}
                    userId={props.userId}
                    setUserId={props.setUserId}
                />
        
        );
    };

    return (
        <div className="main">
            {isLoggedView()}
            {/* <button onClick={logoutHandler}>logout</button> */}
        </div>
    );
};

export default Main;
