import { createSlice } from "@reduxjs/toolkit";
const initialtheme = {
  mode: JSON.parse(localStorage.getItem("darkMode")) || false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialtheme,
  reducers: {
    toggledarkMode: (state) => {
      state.mode = !state.mode;
      localStorage.setItem("darkMode", JSON.stringify(state.mode));
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
