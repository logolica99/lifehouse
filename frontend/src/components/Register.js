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
        <div className="register">
          <div className="register__container">
          <div className="register__logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 128 128"><g><circle cx="64.002" cy="64" r="57.693" fill="#53c7ff"/><path d="M119.675,48.84h-2.04a7.575,7.575,0,0,0-7.58,7.58,7.58,7.58,0,0,1-7.59,7.58H94.488A30.408,30.408,0,0,1,83.874,87.109l-.009.021h5.55a6.27,6.27,0,0,1,0,12.54h-6.91a5.29,5.29,0,0,0,0,10.58H98.5a57.742,57.742,0,0,0,21.18-61.41Z" fill="#97de3d"/><path d="M64,33.514l.006,0v-.56a6,6,0,0,0-6-6h-8.67a5,5,0,0,1-5-5,5.36,5.36,0,0,0-5.37-5.37h-7.83A57.612,57.612,0,0,0,6.305,64q0,1.845.12,3.66H13.1a7.1,7.1,0,0,0,7.11-7.1,7.1,7.1,0,0,1,7.11-7.11h8.078A30.5,30.5,0,0,1,64,33.514Z" fill="#97de3d"/><circle cx="64.002" cy="64" r="30.486" fill="#fff2fb"/><path d="M112.985,33.51H96.635a5.992,5.992,0,0,1-6-6,6,6,0,0,0-6-6h-3.66a6,6,0,0,1-6-6V7.35A57.739,57.739,0,0,1,112.985,33.51Z" fill="#97de3d"/><path d="M37.515,96.31a5.19,5.19,0,0,1-5.17,5.18h-2.63a4.005,4.005,0,0,0-4,4v1.66a57.764,57.764,0,0,1-12.64-16.02h19.27A5.179,5.179,0,0,1,37.515,96.31Z" fill="#97de3d"/><path d="M54.243,53.024a10.993,10.993,0,0,0-10.8,1.956,7.314,7.314,0,0,0,2.74,3.228,7.319,7.319,0,0,0-4.114,1,10.992,10.992,0,0,0,7.586,7.93,13.586,13.586,0,0,0,10.577-1.274l1.818-5.595A13.585,13.585,0,0,0,54.243,53.024Z" fill="#ff8fb8"/><path d="M64.615,68.16,59.855,64.7a13.585,13.585,0,0,0-9.3,5.187,10.99,10.99,0,0,0-1.477,10.874,7.318,7.318,0,0,0,3.917-1.608,7.313,7.313,0,0,0-.319,4.222,10.992,10.992,0,0,0,9.886-4.765A13.588,13.588,0,0,0,64.615,68.16Z" fill="#ff8fb8"/><path d="M77.455,69.889a13.585,13.585,0,0,0-9.3-5.187L63.39,68.16a13.585,13.585,0,0,0,2.057,10.452,10.992,10.992,0,0,0,9.886,4.765,7.313,7.313,0,0,0-.319-4.222,7.322,7.322,0,0,0,3.918,1.608A10.993,10.993,0,0,0,77.455,69.889Z" fill="#ff8fb8"/><path d="M81.82,58.208a7.314,7.314,0,0,0,2.74-3.228,10.991,10.991,0,0,0-10.8-1.956,13.589,13.589,0,0,0-7.809,7.247l1.818,5.595A13.586,13.586,0,0,0,78.348,67.14a10.992,10.992,0,0,0,7.587-7.93A7.324,7.324,0,0,0,81.82,58.208Z" fill="#ff8fb8"/><path d="M66.226,41.659A7.318,7.318,0,0,0,64,45.263a7.318,7.318,0,0,0-2.224-3.6,10.992,10.992,0,0,0-5.2,9.666,13.59,13.59,0,0,0,4.48,9.666h5.883a13.587,13.587,0,0,0,4.479-9.666A10.992,10.992,0,0,0,66.226,41.659Z" fill="#ff8fb8"/><path d="M68.21,64A4.208,4.208,0,1,1,64,59.79,4.208,4.208,0,0,1,68.21,64Z" fill="#fff2fb"/><g><path d="M15.688,32.4a1.751,1.751,0,0,0,2.437-.43c.7-1,1.441-1.99,2.206-2.945a1.749,1.749,0,1,0-2.73-2.188c-.813,1.014-1.6,2.065-2.343,3.126A1.749,1.749,0,0,0,15.688,32.4Z"/><path d="M64,4.557A59.329,59.329,0,0,0,24.261,19.792a1.75,1.75,0,0,0,2.34,2.6,55.871,55.871,0,0,1,5.115-4.069H38.96a3.631,3.631,0,0,1,3.626,3.626,6.758,6.758,0,0,0,6.75,6.75H58a4.243,4.243,0,0,1,4.079,3.124A32.3,32.3,0,0,0,34.207,51.7h-6.9a8.867,8.867,0,0,0-8.857,8.857A5.364,5.364,0,0,1,13.1,65.915H8.105c-.021-.637-.048-1.273-.048-1.915a55.413,55.413,0,0,1,5.5-24.229,1.75,1.75,0,0,0-3.154-1.518A58.9,58.9,0,0,0,4.557,64,59.446,59.446,0,0,0,112.124,98.9a1.75,1.75,0,0,0-2.832-2.057A55.845,55.845,0,0,1,97.865,108.5H82.5a3.542,3.542,0,0,1,0-7.083h6.906a8.02,8.02,0,1,0,0-16.04H88.1A32.1,32.1,0,0,0,96.187,65.75h6.28a9.343,9.343,0,0,0,9.332-9.332,5.839,5.839,0,0,1,5.833-5.832h.674a55.957,55.957,0,0,1-4.734,39.367,1.749,1.749,0,0,0,.738,2.362,1.725,1.725,0,0,0,.81.2,1.751,1.751,0,0,0,1.552-.937A59.464,59.464,0,0,0,64,4.557Zm45.679,27.207H96.628a4.255,4.255,0,0,1-4.25-4.25,7.759,7.759,0,0,0-7.75-7.75H80.977a4.255,4.255,0,0,1-4.25-4.25V9.535A56.072,56.072,0,0,1,109.679,31.764ZM16.109,92.885H32.338a3.426,3.426,0,1,1,0,6.851H29.717a5.756,5.756,0,0,0-5.363,3.692A56.337,56.337,0,0,1,16.109,92.885Zm77.819.513a4.526,4.526,0,0,1-4.52,4.52H82.5A7.042,7.042,0,0,0,82.5,112H92.666a55.745,55.745,0,0,1-65.2-5.688v-.827a2.253,2.253,0,0,1,2.25-2.25h2.621a6.926,6.926,0,1,0,0-13.851H14.173a55.493,55.493,0,0,1-5.85-19.97H13.1a8.868,8.868,0,0,0,8.857-8.857A5.363,5.363,0,0,1,27.309,55.2h5.685A32.219,32.219,0,0,0,84.478,88.878h4.93A4.526,4.526,0,0,1,93.928,93.4ZM64,92.736A28.736,28.736,0,1,1,92.736,64,28.768,28.768,0,0,1,64,92.736Zm44.3-36.318a5.838,5.838,0,0,1-5.832,5.832h-6.28A32.28,32.28,0,0,0,65.656,31.806,7.755,7.755,0,0,0,58,25.2H49.336a3.254,3.254,0,0,1-3.25-3.25,7.134,7.134,0,0,0-7.126-7.126H37.324a55.791,55.791,0,0,1,35.9-5.994v6.682a7.758,7.758,0,0,0,7.75,7.75h3.651a4.254,4.254,0,0,1,4.25,4.25,7.759,7.759,0,0,0,7.75,7.75h15.349A55.747,55.747,0,0,1,117.329,47.1,9.337,9.337,0,0,0,108.3,56.418Z"/><path d="M73.169,51.378a12.7,12.7,0,0,0-6.085-11.243,1.752,1.752,0,0,0-1.959.162A7.793,7.793,0,0,0,64,41.461,7.85,7.85,0,0,0,62.875,40.3a1.751,1.751,0,0,0-1.959-.162,12.7,12.7,0,0,0-6.085,11.243,12.69,12.69,0,0,0-12.572,2.313,1.748,1.748,0,0,0-.451,1.913,7.789,7.789,0,0,0,.758,1.43,7.926,7.926,0,0,0-1.455.71,1.752,1.752,0,0,0-.759,1.813,12.7,12.7,0,0,0,8.812,9.262A12.7,12.7,0,0,0,47.478,81.49a1.732,1.732,0,0,0,1.68,1.02,7.82,7.82,0,0,0,1.595-.28,7.883,7.883,0,0,0,.226,1.6,1.751,1.751,0,0,0,1.49,1.283,8.687,8.687,0,0,0,.936.043A12.568,12.568,0,0,0,64,79.6a12.569,12.569,0,0,0,10.6,5.561,8.687,8.687,0,0,0,.936-.043,1.748,1.748,0,0,0,1.489-1.283,7.729,7.729,0,0,0,.226-1.6,7.835,7.835,0,0,0,1.6.28,1.736,1.736,0,0,0,1.679-1.02,12.7,12.7,0,0,0-1.686-12.672,12.692,12.692,0,0,0,8.812-9.261,1.75,1.75,0,0,0-.758-1.813,7.926,7.926,0,0,0-1.455-.71,7.86,7.86,0,0,0,.758-1.43,1.75,1.75,0,0,0-.451-1.913A12.7,12.7,0,0,0,73.169,51.378ZM64,66.456A2.458,2.458,0,1,1,66.458,64,2.46,2.46,0,0,1,64,66.456ZM61.526,44A5.3,5.3,0,0,1,62.3,45.69a1.75,1.75,0,0,0,3.394,0A5.278,5.278,0,0,1,66.473,44a8.96,8.96,0,0,1,3.2,7.245,12.127,12.127,0,0,1-2.92,7.471A5.913,5.913,0,0,0,64,58.04a5.992,5.992,0,0,0-1.062.1,15.633,15.633,0,0,0-4.312-4.731,12.652,12.652,0,0,1-.3-2.16A8.962,8.962,0,0,1,61.526,44ZM44.22,60.172a5.287,5.287,0,0,1,1.843-.217,1.791,1.791,0,0,0,1.783-1.206,1.749,1.749,0,0,0-.734-2.022,5.3,5.3,0,0,1-1.363-1.259,8.959,8.959,0,0,1,7.879-.805,12.129,12.129,0,0,1,6.2,5.086A5.944,5.944,0,0,0,58.1,63.2a15.641,15.641,0,0,0-5.833,2.64,12.761,12.761,0,0,1-2.147-.383A8.96,8.96,0,0,1,44.22,60.172ZM54.249,81.627a5.283,5.283,0,0,1,.362-1.82,1.75,1.75,0,0,0-2.746-2,5.281,5.281,0,0,1-1.616.907,8.98,8.98,0,0,1,1.669-7.741,12.119,12.119,0,0,1,6.754-4.329,5.988,5.988,0,0,0,2.743,2.709,15.638,15.638,0,0,0,.708,6.366A12.7,12.7,0,0,1,61.1,77.646,8.962,8.962,0,0,1,54.249,81.627Zm23.5-2.908a5.24,5.24,0,0,1-1.619-.907,1.75,1.75,0,0,0-2.746,2,5.3,5.3,0,0,1,.363,1.817A8.981,8.981,0,0,1,66.9,77.646a12.117,12.117,0,0,1-2.029-7.761A5.948,5.948,0,0,0,68.3,68.111a15.548,15.548,0,0,0,6.238,1.3l.043,0a12.63,12.63,0,0,1,1.5,1.564A8.959,8.959,0,0,1,77.753,78.719Zm4.5-23.252a5.32,5.32,0,0,1-1.363,1.26,1.749,1.749,0,0,0-.734,2.022,1.771,1.771,0,0,0,1.783,1.206,5.259,5.259,0,0,1,1.84.216,8.984,8.984,0,0,1-5.9,5.283,12.139,12.139,0,0,1-8.009-.469,5.83,5.83,0,0,0-.624-3.809,15.636,15.636,0,0,0,3.165-5.561,12.561,12.561,0,0,1,1.962-.952A8.959,8.959,0,0,1,82.251,55.467Z"/></g></g></svg>
              <h1>LIFEHOUSE</h1>
            </div>
            <div className="register__form">
              <h2>Sign Up</h2>
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
                <p>
                  Already have an account?{" "}
                  <a href="" onClick={registerPageToLoginPage}>
                    Login
                  </a>
                </p>
                <input
                  type="submit"
                  value="Sign Up"
                  className="red-button signup_button"
                />
              </form>
            </div>
          </div>
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

  return loginPageOrRegisterPage();
};
export default Register;
