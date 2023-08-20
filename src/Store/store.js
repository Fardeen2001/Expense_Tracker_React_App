import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import emailVerification from "./emailSlice";
import premium from "./premium";
import theme from "./theme";

const store = configureStore({
  reducer: {
    auth: auth,
    email: emailVerification,
    premium: premium,
    darkMode: theme,
  },
});
export default store;
