import Login from "./Login";
import React, { useState } from "react";

const Register = (props) => {
  const [registerPage, setRegisterPage] = useState(true);

  //console.log(props)
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const registerPageToLoginPage = (e) => {
    e.preventDefault();
    setRegisterPage(false);
  };

  const usernameFormHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordFormHandler = (e) => {
    setPassword(e.target.value);
  };
  const confirmationFormHandler = (e) => {
    setConfirmation(e.target.value);
  };
  const emailFormHandler = (e) => {
    setEmail(e.target.value);
  };
  const firstNameFormHandler = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameFormHandler = (e) => {
    setLastName(e.target.value);
  };

  const loginPageOrRegisterPage = () => {
    if (registerPage) {
      return (
        <div>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={usernameFormHandler}
            />
            <input
              type="text"
              placeholder="First Name"
              value={first_name}
              onChange={firstNameFormHandler}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={last_name}
              onChange={lastNameFormHandler}
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={emailFormHandler}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={passwordFormHandler}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmation}
              onChange={confirmationFormHandler}
            />
            <input type="submit" value="Sign Up" />
          </form>
          <p>
            Already have an account?{" "}
            <a href="" onClick={registerPageToLoginPage}>
              Login
            </a>
          </p>
        </div>
      );
    } else {
      return (
        <Login
          username={props.username}
          setUsername={props.setUsername}
          setIsLogged={props.setIsLogged}
          userId={props.userId}
          setUserId={props.setUserId}
        />
      );
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    var csrftoken = getCookie("csrftoken");
    fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        confirmation: confirmation,
        first_name: first_name,
        last_name: last_name,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data.message);
        props.setUsername(username);
        if (data.message === "account created successfully") {
          props.setUserId(data.user_id);
          props.setIsLogged("true");
        }
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  };

  return <div>{loginPageOrRegisterPage()}</div>;
};
export default Register;
