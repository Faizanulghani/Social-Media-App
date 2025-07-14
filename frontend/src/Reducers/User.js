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
