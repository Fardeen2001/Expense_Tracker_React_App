import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <nav className={classes.nav}>
      <h4>Welcome To Expense Tracker</h4>
      <div className={classes.badge}>
        Your profile is incomplete <NavLink to="/profile">Complete Now</NavLink>
      </div>
    </nav>
  );
};

export default Home;
