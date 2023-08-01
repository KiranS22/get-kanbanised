import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  token: null,
};

const Auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInUser: (state, action) => {
      console.log(action.payload);
      const { user, token } = action.payload;
      if (user && token) {
        state.user = user;
        state.isLoggedIn = true;
        state.token = token;
        localStorage.setItem("token", token);
      }
    },
    logOutUser: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { logInUser, logOutUser, updateUser } = Auth.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectToken = (state) => state.auth.token;
export default Auth.reducer;
