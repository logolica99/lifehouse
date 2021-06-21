import Posts from "./Posts";
import CreatePost from "./CreatePost";

const Homepage = (props) => {
  return (
    <div className="homepage">
      <CreatePost
        username={props.username}
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
