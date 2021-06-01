
const Notification = (props) =>{
    return(
        <p><b>{props.notification.username}</b> {props.notification.content}</p>
    )
}
export default Notification;