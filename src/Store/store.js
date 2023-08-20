import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import emailVerification from "./emailSlice";
import premium from "./premium";

const store = configureStore({
  reducer: {
    auth: auth,
    email: emailVerification,
    premium: premium,
  },
});
export default store;
