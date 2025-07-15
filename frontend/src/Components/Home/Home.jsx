import Post from "../Post/Post";
import User from "../User/User";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFollowingPosts } from "../../Actions/User";
import { getAllUsers } from "../../Actions/User";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import "./Home.css";

const Home = () => {
  let dispacth = useDispatch();
  let { loading, posts, error } = useSelector(
    (state) => state.postsOfFollowing
  );
  let { users,loading:usersLoading } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispacth(getFollowingPosts());
    dispacth(getAllUsers());
  }, [dispacth]);

  return loading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              // postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              // ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )}
      </div>
      <div className="homeright">
        {users && users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
