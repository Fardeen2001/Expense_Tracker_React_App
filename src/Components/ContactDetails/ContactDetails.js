import { AccountCircle } from "@mui/icons-material";
import { Box, Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import classes from "./ContactDetails.module.css";
import { NavLink } from "react-router-dom";

const ContactDetails = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDSc40lXY98ukYYL93R9ZxaIMQ1m5OfS-E",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("idtoken"),
            displayName: name,
            photoUrl: url,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("error");
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <nav className={classes.nav}>
        <h4>Winners Never Quit, Quitters Never Win.</h4>
        <div className={classes.badge}>
          Your profile is 64% completed, A complete profile has higher chances
          of landing a job. <NavLink to="/profile">Complete Now</NavLink>
        </div>
      </nav>
      <div className={classes.contact}>
        <div className={classes.header}>
          <h2>Contact Details</h2>
          <Button variant="outlined" color="error">
            Cancel
          </Button>
        </div>
        <form onSubmit={submitHandler}>
          <div className={classes.form}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 2.5 }} />
              <FormControl variant="standard" required fullWidth>
                <TextField
                  id="input-with-sx"
                  label="Enter Name"
                  variant="standard"
                  helperText="Enter Full Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 2.5 }} />
              <FormControl
                variant="standard"
                id="input-with-sx"
                required
                fullWidth
              >
                <TextField
                  required
                  fullWidth
                  id="input-with-sx"
                  label="Enter Url"
                  variant="standard"
                  helperText="Enter Profile Photo Url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                  x
                />
              </FormControl>
            </Box>
            <Button
              variant="contained"
              className={classes.updatebtn}
              type="submit"
            >
              update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactDetails;
