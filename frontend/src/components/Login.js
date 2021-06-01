import React, { useState, useEffect } from 'react';



const Login = (props) =>{
 
    const [password,setPassword] = useState('');
    const usernameFormHandler = (e) =>{
        props.setUsername(e.target.value)
     
    }
    const passwordFormHandler = (e) =>{
        setPassword(e.target.value)
    }

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




    const submitHandler = (e) =>{
        e.preventDefault()
        var csrftoken = getCookie('csrftoken')
        fetch('http://127.0.0.1:8000/api/login', {
            method:'POST',
            headers:{
              'Content-type':'application/json',
              'X-CSRFToken':csrftoken,
            },
            body: JSON.stringify({'username':props.username,'password':password})
          }).then( data => data.json())
          .then(
            data => {
                console.log(data.message)
                if(data.message==="Logged in Successfully"){
                    props.setUserId(data.user_id)
                    props.setIsLogged("true")
                    
                }
            }
          ).catch(function(error){
            console.log('ERROR:', error)
          })
         
      
    }

    return(
        <div>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="Username" onChange={usernameFormHandler} value={props.username}/>
                <input type="password" placeholder="Password" onChange={passwordFormHandler} value={password}/>
                <input type="submit"  value="login" /> 
            </form>
        </div>
    )
}
export default Login;