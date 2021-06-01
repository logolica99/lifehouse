import Login from './Login';
import Nav from './Nav';
import Homepage from './Homepage';
import Search from './Search';
import Notifications from './Notifications';
import Message from './Message';
import User from './User';
import Posts from './Posts';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const Main = (props) => {
 
    useEffect(() => {
        isLoggedView();
    }, [props.isLogged]);

    const logoutHandler = () => {
        props.setIsLogged(false);
    };//component={Homepage} 
    const isLoggedView = () => {
        if (props.isLogged === 'true') {
            return (
                <Router>
                    <div>
                        <Nav/>
                        <Route path='/' exact render={useless=>(<Homepage posts={props.posts}/>)}/>
                        <Route path='/search' exact component={Search} />
                        <Route
                            path='/notifications'
                            exact
                            render={useless=>(<Notifications notifications={props.notifications}/>)}
                           
                        />
                        <Route path='/messages' exact component={Message} />
                        <Route
                            path='/User'
                            exact 
                            render={useless=>(<User username={props.username}
                                followers={props.followers}
                                following={props.following}
                                 userData={props.userData}/> )}
                        />

                        

                    </div>
                </Router>
            );
        }
        return (
            <div>
                <Login
                    username={props.username}
                    setUsername={props.setUsername}
                    setIsLogged={props.setIsLogged}
                    userId = {props.userId}
                    setUserId = {props.setUserId}
                />
            </div>
        );
    };

    return (
        <div>
            {isLoggedView()}
            <button onClick={logoutHandler}>logout</button>
        </div>
    );
};

export default Main;
