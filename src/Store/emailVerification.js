// EmailVerification.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setEmailVerified as setEmailVerifiedAction } from "./emailSlice";

const EmailVerification = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const email = localStorage.getItem("email"); // Retrieve email from localStorage
    const EmailVerifyHandler = async () => {
      try {
        if (!email) {
          throw new Error("Email not found in localStorage");
        }

        const editedEmail = email.replace(/[@.]/g, "");
        const res = await fetch(
          `https://expense-tracker-fardeen-default-rtdb.asia-southeast1.firebasedatabase.app/userVerified${editedEmail}.json`
        );
        if (!res.ok) {
          throw new Error("Email is not verified");
        }
        if (res.ok) {
          dispatch(setEmailVerifiedAction.setEmailVerified(true));
          localStorage.setItem("emaliIsVerified", true);
        } else {
          dispatch(setEmailVerifiedAction.setEmailVerified(false));
          localStorage.setItem("emaliIsVerified", false);
        }
        await res.json();
      } catch (error) {
        console.error(error);
      }
    };

    EmailVerifyHandler();
  }, [dispatch]);
};
export default EmailVerification;
