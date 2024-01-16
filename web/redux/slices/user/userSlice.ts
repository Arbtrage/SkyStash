import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Login, Register, Logout } from "./userApi";

interface UserData{
    accessToken: string,
    refreshToken:string
}
interface UserState {
    userData: {} ;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    userData: {} as UserData || null,
    isAuthenticated: false
}

export const login=createAsyncThunk("auth/login",async(data:any)=>{
    const response = await Login(data);
    return response;
})

export const logout=createAsyncThunk("auth/logout",async()=>{
    const response = await Logout();
    return response;
})

export const register=createAsyncThunk("auth/register",async(data:any)=>{
    const response = await Register(data);
    return response;
})
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log(action.payload);
                state.userData = action.payload.userData
                state.isAuthenticated = action.payload.isAuthenticated
            })
            // .addCase()
    }
})

export const selectUserData = (state:any) => state.auth;
export default userSlice.reducer;