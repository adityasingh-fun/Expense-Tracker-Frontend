import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  //! name
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
  },
  //! reducers
  reducers: {
    //! login
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    //! logout
    logoutAction: (state, action) => {
      state.user = null;
    },
  },
});

//! Generate actions
export const { loginAction, logoutAction } = authSlice.actions;

//! Generate reuduce
const authReducer = authSlice.reducer;

export default authReducer;
