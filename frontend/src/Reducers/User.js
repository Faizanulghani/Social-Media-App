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
    })
    .addCase("loginFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("RegisterRequest", (state) => {
      state.loading = true;
    })
    .addCase("RegisterSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("RegisterFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("loadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("loadUserSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("loadUserFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
