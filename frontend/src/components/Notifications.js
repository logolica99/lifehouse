import Notification from './Notification'


const Notifications= (props) =>{

   console.log(props.notifications.length);
    if(props.notifications.length===0){
        return(
            <div>
                <h3>No new notifications</h3>
            </div>
        )
    }else{

    return(
        <div>
           
            {props.notifications.map(notification=>(
         
                <Notification notification={notification} key={notification.id}/>
        ))}
        </div>
    )
}
}

export default Notifications;