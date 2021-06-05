import Posts from './Posts';
import CreatePost from './CreatePost';

const Homepage = (props) => {
    return (
        <div>
            <CreatePost
                userId={props.userId}
                setPostSubmit={props.setPostSubmit}
            />
            <Posts
                posts={props.posts}
                userId={props.userId}
                setCommentSubmit={props.setCommentSubmit}
            />
        </div>
    );
};

export default Homepage;
