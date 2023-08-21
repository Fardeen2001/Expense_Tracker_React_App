import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { premiumAction } from "./premium";

const PremiumUser = () => {
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  const premium = async () => {
    try {
      const editedEmail = email.replace(/[@.]/g, "");
      const res = await fetch(
        `https://expense-tracker-fardeen-default-rtdb.asia-southeast1.firebasedatabase.app/PremiumUser${editedEmail}.json`
      );
      if (!res.ok) {
        throw new Error("error");
      }

      const data = await res.json();
      console.log("prem", data);
      if (res.ok) {
        dispatch(premiumAction.premiumUser(true));
        localStorage.setItem("premiumUser", true);
        console.log("prem");
      } else {
        dispatch(premiumAction.premiumUser(false));
        localStorage.setItem("premiumUser", false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    premium();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default PremiumUser;
