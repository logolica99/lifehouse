import React, { useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [queryString, setQueryString] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [afterSearch, setAfterResults] = useState("");

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
    setAfterResults(`Results for "${queryString}:"`);
    var queryWord = queryString.split(" ").join(" ");
    const url = "http://192.168.0.103:8000/api";

    const data = await fetch(`${url}/query/${queryWord}`);
    const results = await data.json();
    //        console.log(results);
    setQueryResults(results);
  };

  return (
    <div className="search_page">
      <div className="search_container">
        <form onSubmit={submitHandler}>
          <input type="text" onChange={queryFormHandler} value={queryString} />
          <button type="submit">Search</button>
        </form>
        <h2 className="search_query_text">{afterSearch}</h2>

        <div className="allresults">
          {queryResults.map((result) => {
            return (
              <div className="result_container">
                <Link to={`/user/${result}`}>
                  <h3 class="result">@{result}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>


    </div>
  );
};

export default Search;
