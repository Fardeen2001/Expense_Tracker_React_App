import { createSlice } from "@reduxjs/toolkit";
const intialPremiumState = {
  isPremium: false,
};
const premiumSlice = createSlice({
  name: "premium",
  initialState: intialPremiumState,
  reducers: {
    premium(state, action) {
      state.isPremium = true;
    },
  },
});
export const premiumAction = premiumSlice.actions;
export default premiumSlice.reducer;
