import { createSlice } from "@reduxjs/toolkit";

const initialAuth = { isAuthenticated: false, token: "" };
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem("idtoken", action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      localStorage.removeItem("idtoken");
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
