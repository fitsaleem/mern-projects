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
        state.messageError = null;
      },
      signInSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.messageError = null;
      },
      signInFailure: (state, action) => {
        state.loading = false;
        state.messageError = action.payload;
      },
      updateStart: (state) => {
        state.loading = true;
        state.messageError = null;
      },
      updateSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.messageError = null;
      },
      updateFailure: (state, action) => {
        state.loading = false;
        state.messageError = action.payload;
      },
      deleteUserStart: (state) => {
        state.loading = true;
        state.messageError = null;
      },
      deleteUserSuccess: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.messageError = null;
      },
      deleteUserFailure: (state, action) => {
        state.loading = false;
        state.messageError = action.payload;
      },
      signoutSuccess: (state) => {
        state.currentUser = null;
        state.messageError = null;
        state.loading = false;
      },
      forgotPasswordStart: (state) => {
        state.loading = true;
        state.messageError = null;
      },
      forgotPasswordSuccess: (state) => {
        state.loading = false;
        state.messageError = null;
      },
      forgotPasswordFailure: (state, action) => {
        state.loading = false;
        state.messageError = action.payload;
      },
      resetPasswordStart: (state) => {
        state.loading = true;
        state.messageError = null;
      },
      resetPasswordSuccess: (state) => {
        state.loading = false;
        state.messageError = null;
      },
      resetPasswordFailure: (state, action) => {
        state.loading = false;
        state.messageError = action.payload;
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
