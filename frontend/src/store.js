import { configureStore } from "@reduxjs/toolkit";
import { postOfFollowingReducer, userReducer } from "./Reducers/User";
const store = configureStore({
  reducer: { user: userReducer, postsOfFollowing: postOfFollowingReducer },
});

export default store;
