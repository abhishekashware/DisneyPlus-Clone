import { createSlice } from "@reduxjs/toolkit";


const initialState={
     loggedIn:false
}
const loginSlice=createSlice({
    name:'login',
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.loggedIn=action.payload.loggedIn;
        }
    }
});

export const {setLogin}=loginSlice.actions;
export const selectLogin=state=>state.login.loggedIn;

export const loginReducer=loginSlice.reducer;