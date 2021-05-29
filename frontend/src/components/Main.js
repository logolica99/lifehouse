import Login from './Login'
import Nav from './Nav'
import React, { useState, useEffect } from 'react';
const Main = (props) =>{
    
    useEffect(()=>{
        isLoggedView();
    },[props.isLogged])

    const logoutHandler = () =>{
        props.setIsLogged(false);
    }
    const isLoggedView = () =>{
        if (props.isLogged==="true"){
        return(
            <div>
                <Nav/>
            </div>
        )
    }
    return(
            <div>
                <Login username={props.username} setUsername={props.setUsername} setIsLogged={props.setIsLogged}/>
            </div>
        )
    }

    return(
        <div>
            {isLoggedView()}
            <button onClick={logoutHandler}>logout</button>
        </div>

    )
}

export default Main;