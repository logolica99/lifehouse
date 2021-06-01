const Post = (props) =>{
    return(
        <div>
            <hr/>
            <h3>{props.username}</h3>
            <p>{props.content}</p>
            <p><b>Likes:</b> {props.likes}</p>
            <hr/>
        </div>
    )
}
export default Post;