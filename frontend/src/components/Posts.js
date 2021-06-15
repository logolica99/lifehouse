import Post from './Post';



const Posts = (props) => {
    //  console.log(props.posts)

    return (
        <div>
            {props.posts.map((post) => {
                return (
                    <div>
                        <Post post={post} key={post.id} userId={props.userId} />




                    </div>
                );
            })}
        </div>
    );
};

export default Posts;
