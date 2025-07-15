import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("loginRequest", (state) => {
      state.loading = true;
    })
    .addCase("loginSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("loginFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    .addCase("RegisterRequest", (state) => {
      state.loading = true;
    })
    .addCase("RegisterSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("RegisterFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    .addCase("loadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("loadUserSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("loadUserFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });
});

export const postOfFollowingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("postOfFollowingRequest", (state) => {
      state.loading = true;
    })
    .addCase("postOfFollowingSuccess", (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase("postOfFollowingFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export const allUserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("allUsersRequest", (state) => {
      state.loading = true;
    })
    .addCase("allUsersSuccess", (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase("allUsersFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
