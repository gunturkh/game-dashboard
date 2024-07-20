import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const storedUser = JSON.parse(localStorage.getItem("user"));

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser || null,
    isAuth: !!storedUser,
    token: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    logOut: (state, action) => {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, logOut, setToken } = authSlice.actions;
export default authSlice.reducer;
