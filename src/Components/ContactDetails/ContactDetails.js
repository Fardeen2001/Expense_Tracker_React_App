import { AccountCircle } from "@mui/icons-material";
import { Box, Button, FormControl, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import classes from "./ContactDetails.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ContactDetails = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.email);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDSc40lXY98ukYYL93R9ZxaIMQ1m5OfS-E",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: localStorage.getItem("idtoken"),
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
        //console.log(data, data.users[0].displayName, data.users[0].photoUrl);
        setName(data.users[0].displayName);
        setUrl(data.users[0].photoUrl);
      } catch (error) {
        alert(error.message);
      }
      try {
        const editedEmail = email.replace(/[@.]/g, "");
        const response = await fetch(
          `https://expense-tracker-fardeen-default-rtdb.asia-southeast1.firebasedatabase.app/userData${editedEmail}.json`
        );

        if (!response.ok) {
          throw new Error("Something went wrong ....Retrying");
        }
        const data = await response.json();
        setName(data.users[0].displayName);
        setUrl(data.users[0].photoUrl);
      } catch (error) {}
    };
    getUser();
  }, [email]);

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
      await res.json();
      //console.log(data);
    } catch (error) {
      alert(error.message);
    }
    try {
      const editedEmail = email.replace(/[@.]/g, "");
      const response = fetch(
        `https://expense-tracker-fardeen-default-rtdb.asia-southeast1.firebasedatabase.app/userData${editedEmail}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            displayName: name,
            photoUrl: url,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await response.json();
      //console.log(data);
    } catch (error) {}
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
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              navigate("/");
            }}
          >
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
