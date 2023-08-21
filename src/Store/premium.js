import { createSlice } from "@reduxjs/toolkit";
const intialPremiumState = {
  isPremium: localStorage.getItem("premiumUser") || false,
  premiumUser: localStorage.getItem("premiumUser") || false,
};
const premiumSlice = createSlice({
  name: "premium",
  initialState: intialPremiumState,
  reducers: {
    premium(state, action) {
      state.isPremium = true;
    },
    premiumUser(state, action) {
      state.premiumUser = true;
    },
  },
});
export const premiumAction = premiumSlice.actions;
export default premiumSlice.reducer;
