import { Link } from "react-router-dom";

const Notification = (props) => {
  return (
    <div className="notification">
      <Link to={`/user/${props.notification.username}`}>
        <p className="username">@{props.notification.username}</p>
      </Link>
      <p className="content">{props.notification.content}</p>
    </div>
  );
};
export default Notification;
