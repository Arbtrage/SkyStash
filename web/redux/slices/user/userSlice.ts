import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Login, Register, Logout } from "./userApi";
const astring = typeof window !== "undefined" ? localStorage.getItem("accessToken") || "" : "";
const rstring = typeof window !== "undefined" ? localStorage.getItem("refreshToken") || "" : "";

const auth= typeof window !== "undefined" ? localStorage.getItem("auth") ? true:false : false;

interface UserData {
  accessToken: string;
  refreshToken: string;
}

interface UserState {
  userData: UserData | null; 
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userData: {
    accessToken: astring,
    refreshToken: rstring,
  },
  isAuthenticated: auth,
};

export const login = createAsyncThunk("auth/login", async (data: any) => {
  const response = await Login(data);
  return response;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await Logout();
  return response;
});

export const register = createAsyncThunk("auth/register", async (data: any) => {
  const response = await Register(data);
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.isAuthenticated = action.payload.isAuthenticated;
      });
  },
});

export const selectUserData = (state: any) => state.user;
export default userSlice.reducer;
