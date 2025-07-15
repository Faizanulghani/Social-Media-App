import { configureStore } from "@reduxjs/toolkit";
import {
  allUserReducer,
  postOfFollowingReducer,
  userReducer,
} from "./Reducers/User";
const store = configureStore({
  reducer: {
    user: userReducer,
    postsOfFollowing: postOfFollowingReducer,
    allUsers: allUserReducer,
  },
});

export default store;
