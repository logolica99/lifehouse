import Posts from "./Posts";
import CreatePost from "./CreatePost";

const Homepage = (props) => {
  return (
    <div className="homepage">
      <CreatePost
        username={props.username}
        userId={props.userId}
        setPostSubmit={props.setPostSubmit}
        apiUrl={props.apiUrl}
      />
      <Posts
        posts={props.posts}
        userId={props.userId}
        setCommentSubmit={props.setCommentSubmit}
        apiUrl={props.apiUrl}
      />
    </div>
  );
};

export default Homepage;
