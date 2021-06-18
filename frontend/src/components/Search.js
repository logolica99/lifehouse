import React, { useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [queryString, setQueryString] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [afterSearch,setAfterResults] = useState('');

  const queryFormHandler = (e) => {
    setQueryString(e.target.value);
  };

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

  const submitHandler = async (e) => {
    e.preventDefault();
    setAfterResults(`Results for "${queryString}:"`)
    var queryWord = queryString.split(" ").join(" ");


    const data = await fetch(`http://127.0.0.1:8000/api/query/${queryWord}`);
    const results = await data.json();
    //        console.log(results);
    setQueryResults(results);
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="text" onChange={queryFormHandler} value={queryString} />
      <input type="submit" value="Search" />
        <h2>{afterSearch}</h2>
      {queryResults.map((result) => {
        return (
          <div>
            <Link to={`/user/${result}`}>
              <h3>@{result}</h3>
            </Link>
            <hr />
          </div>
        );
      })}
    </form>
  );
};

export default Search;
