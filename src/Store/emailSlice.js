// emailSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialVerification = {
  isEmailVerified: localStorage.getItem("emaliIsVerified"),
};

const emailSlice = createSlice({
  name: "email",
  initialState: initialVerification,
  reducers: {
    setEmailVerified: (state, action) => {
      state.isEmailVerified = action.payload;
    },
  },
});

export const setEmailVerified = emailSlice.actions;
export default emailSlice.reducer;
