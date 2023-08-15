import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Home.module.css";
import { Button } from "@mui/material";
import AuthContext from "../Context/authContext";
import AddExpenseForm from "./AddExpenseForm";

const Home = () => {
  const authCxt = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = (e) => {
    e.preventDefault();
    authCxt.logout();
    navigate("/auth", { replace: true });
  };
  const verifyHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDSc40lXY98ukYYL93R9ZxaIMQ1m5OfS-E",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCxt.token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("invalid");
      }
      const data = await response.json();
      const email = authCxt.email;
      const editedEmail = email.replace(/[@.]/g, "");
      const res = await fetch(
        `https://expense-tracker-fardeen-default-rtdb.asia-southeast1.firebasedatabase.app/userVerified${editedEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            kind: data.kind,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("invalid");
      }
      const dt = await res.json();
      console.log("dt", dt);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <nav className={classes.nav}>
        <div>
          <h4>Welcome To Expense Tracker</h4>
          {!authCxt.isEmailVerified && (
            <div>
              <Button variant="outlined" onClick={verifyHandler}>
                Verify Your Email
              </Button>
            </div>
          )}
        </div>
        <div className={classes.side}>
          <div>
            <Button
              variant="outlined"
              className={classes.logout}
              onClick={logoutHandler}
            >
              logout
            </Button>
          </div>
          <div className={classes.badge}>
            Your profile is incomplete{" "}
            <NavLink to="/profile">Complete Now</NavLink>
          </div>
        </div>
      </nav>
      <AddExpenseForm />
    </>
  );
};

export default Home;
