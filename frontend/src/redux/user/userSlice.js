import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    messageError: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart: (state)=>{
            state.loading = true;
            state.messageError = null;
        },
        signInSuccess: (state, action)=>{
            state.currentUser = action.payload;
            state.loading= false;
            state.messageError = null;
        },
        signInFailure: (state, action)=>{
            state.loading= false;
            state.messageError = action.payload;
        },
        
    }
});

export const { signInStart , signInSuccess, signInFailure} = userSlice.actions;

export default userSlice.reducer;