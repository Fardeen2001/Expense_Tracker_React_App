import { AddCircleOutlineOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import classes from "./ForgotPassword.module.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDSc40lXY98ukYYL93R9ZxaIMQ1m5OfS-E",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("invalid Retry");
      }
      const data = await res.json();
      setIsLoading(false);
      navigate("/auth", { replace: true });
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };
  return (
    <Grid className={classes.grid}>
      <Paper elevation={20} className={classes.paper}>
        <Grid align="center">
          <Avatar className={classes.avatar}>
            <AddCircleOutlineOutlined />
          </Avatar>
          <h1 className={classes.header}>Forgot Password</h1>

          <Typography variant="caption">
            Please Enter Your Email To Reset Password
          </Typography>
        </Grid>
        <form onSubmit={resetPasswordHandler}>
          <FormControl variant="standard" required fullWidth>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              id="outlined-required email"
              type="email"
              label="Email"
              variant="standard"
              fullWidth
              inputProps={{ inputMode: "email" }}
            />
          </FormControl>

          <Button type="submit" variant="contained" className={classes.button}>
            {!isLoading ? "Send Link" : "Loading..."}
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default ForgotPassword;
