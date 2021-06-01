import Post from './Post'

const Posts = (props) =>{
 //   console.log(props.posts)

    return(
        <div>

            {props.posts.map(post=>{
                return(
                    <Post username={post.username} content={post.content} key={post.id} likes={post.likes}/>
                )
            })}
        </div>
    )
}

export default Posts;