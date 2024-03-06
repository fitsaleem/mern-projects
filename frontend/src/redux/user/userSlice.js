import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  messageError: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      signInStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      signInSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
      },
      signInFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      updateStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      updateSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
      },
      updateFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      deleteUserStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      deleteUserSuccess: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = null;
      },
      deleteUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      signoutSuccess: (state) => {
        state.currentUser = null;
        state.error = null;
        state.loading = false;
      },
      forgotPasswordStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      forgotPasswordSuccess: (state) => {
        state.loading = false;
        state.error = null;
      },
      forgotPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      resetPasswordStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      resetPasswordSuccess: (state) => {
        state.loading = false;
        state.error = null;
      },
      resetPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });
  
  export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateStart,
    updateSuccess,
    updateFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signoutSuccess,
    forgotPasswordStart,
    forgotPasswordSuccess,
    forgotPasswordFailure,
    resetPasswordStart,
    resetPasswordSuccess,
    resetPasswordFailure,
  } = userSlice.actions;
  
  export default userSlice.reducer;
