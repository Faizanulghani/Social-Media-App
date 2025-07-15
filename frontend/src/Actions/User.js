import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch({ type: "loginSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "loginFailure", payload: error.message });
  }
};
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get("/api/v1/me");

    dispatch({ type: "loadUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "loadUserFailure", payload: error.message });
  }
};

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "postOfFollowingRequest",
    });

    const { data } = await axios.get("/api/v1/my/posts");

    dispatch({
      type: "postOfFollowingSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "postOfFollowingFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "allUsersRequest",
    });

    const { data } = await axios.get("/api/v1/user");

    dispatch({
      type: "allUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "allUsersFailure",
      payload: error.response.data.message,
    });
  }
};
