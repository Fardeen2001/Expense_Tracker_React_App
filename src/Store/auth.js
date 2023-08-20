import { createSlice } from "@reduxjs/toolkit";
const loadAuthFromLocalStorage = () => {
  const token = localStorage.getItem("idtoken") || "";
  const email = localStorage.getItem("email") || "";
  const isAuthenticated = Boolean(token && email); // You can adjust the logic here based on your requirements
  return { isAuthenticated, token, email };
};

const initialAuth = loadAuthFromLocalStorage();
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      //console.log("here", action.payload);
      localStorage.setItem("idtoken", action.payload.token);
      localStorage.setItem("email", action.payload.email);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      state.email = "";
      localStorage.removeItem("idtoken");
      localStorage.removeItem("email");
    },
  },
});
export const authActions = authSlice.actions;

export default authSlice.reducer;
