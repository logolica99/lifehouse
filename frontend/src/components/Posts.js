import Post from './Post';



const Posts = (props) => {
    //  console.log(props.posts)

    return (
        <div className="allposts">
            {props.posts.map((post) => {
                return (
                    <div>
                        <Post post={post} key={post.id} userId={props.userId}  apiUrl={props.apiUrl}/>




                    </div>
                );
            })}
        </div>
    );
};

export default Posts;
