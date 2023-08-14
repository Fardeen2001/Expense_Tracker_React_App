import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Home.module.css";
import { Button } from "@mui/material";

const Home = () => {
  const verifyHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDSc40lXY98ukYYL93R9ZxaIMQ1m5OfS-E",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: localStorage.getItem("idtoken"),
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
      console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <nav className={classes.nav}>
      <h4>Welcome To Expense Tracker</h4>
      <div>
        <Button variant="outlined" onClick={verifyHandler}>
          Verify Your Email
        </Button>
      </div>
      <div className={classes.badge}>
        Your profile is incomplete <NavLink to="/profile">Complete Now</NavLink>
      </div>
    </nav>
  );
};

export default Home;
