import { Link } from "react-router-dom";
import home_png from "./img/icons/home.png";
import search_png from "./img/icons/searchh.png";
import notification_red_png from "./img/icons/notification_red.png";
import messages_png from "./img/icons/message.png";
import user_png from "./img/icons/user.png";
import notification_png from "./img/icons/notification_white.svg";
import logo from './img/icons/around-the-world.png'


const Nav = (props) => {
  return (
    <div className="navbar">
      <ul>
          <div className="gap"></div>
        <Link to={{ pathname: "/" }} className="weblogo">
          <li> <img title="lifehouse" src={logo} alt="" /></li>
        </Link>
        <div className="gap"></div>
        <Link to="/" className="home_logo">
          <li>
            <img title="Home" src={home_png} alt="" />
          </li>
        </Link>
        <Link to="/search" className="search_logo ">
          <li>
            {" "}
            <img title="Search" src={search_png} alt="" />
          </li>
        </Link>
        <Link to="/notifications" className="notification_logo">
          <li>
            {" "}
            <img title="Notifications" src={notification_png} alt="" />
          </li>
        </Link>
        <Link to="/messages" className="messages_logo ">
          <li>
            {" "}
            <img title="Messages" src={messages_png} alt="" />
          </li>
        </Link>
        <Link to={`/user/${props.username}`} className="user_logo ">
          <li>
            {" "}
            <img title="Profile" src={user_png} alt="" />
          </li>
        </Link>

      </ul>
    </div>
  );
};

export default Nav;
