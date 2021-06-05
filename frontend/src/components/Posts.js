import Post from './Post';
import Comment from './Comment';
import CreateComment from './CreateComment';

const Posts = (props) => {
    //  console.log(props.posts)

    return (
        <div>
            {props.posts.map((post) => {
                return (
                    <div>
                        <Post post={post} key={post.id} userId={props.userId} />
                        <CreateComment
                            userId={props.userId}
                            postId={post.id}
                            setCommentSubmit={props.setCommentSubmit}
                        />
                        <h5>Comments:</h5>
                        {post.comments.map((comment) => {
                            return (
                                <div>
                                    <Comment
                                        key={comment[0].id}
                                        comment={comment}
                                        userId={props.userId}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Posts;
