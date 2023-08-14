import React, { useState } from "react";
import classes from "./AuthSignupForm.module.css";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AuthSignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (name.length < 3 || password !== confirmPassword) {
      alert(
        "Invalid input: Name should be at least 3 characters and passwords should match."
      );
      setIsLoading(false);
      return;
    }

    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSc40lXY98ukYYL93R9ZxaIMQ1m5OfS-E";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSc40lXY98ukYYL93R9ZxaIMQ1m5OfS-E";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Invalid Email or password");
      }
      const data = await response.json();
      setIsLoading(false);
      console.log(data);
      localStorage.setItem("idtoken", data.idToken);
      navigate("/", { replace: true });
      //   console.log(data.idToken);
      //   authCxt.login(data.idToken, emailInput.current.value);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };
  return (
    <Grid>
      <Paper elevation={20} className={classes.paper}>
        <Grid align="center">
          <Avatar className={classes.avatar}>
            <AddCircleOutlineOutlined />
          </Avatar>
          <h1 className={classes.header}>{isLogin ? "LOGIN" : "SIGNUP"}</h1>

          <Typography variant="caption">
            {!isLogin
              ? "Please Fill This Form To Create An Account!"
              : "Please Fill This Form To Enter Into Your Account!"}
          </Typography>
        </Grid>
        <form onSubmit={submitHandler}>
          <FormControl variant="standard" required fullWidth>
            <TextField
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              id="outlined-required text"
              label="Name"
              variant="standard"
              fullWidth
            />
          </FormControl>
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
          <FormControl variant="standard" required fullWidth>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="standard-adornment-password"
              fullWidth
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard" required fullWidth>
            <InputLabel htmlFor="standard-adornment-password">
              Confirm Password
            </InputLabel>
            <Input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              id="standard-adornment-password confirm"
              fullWidth
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className={classes.action}>
            {!isLoading && (
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
              >
                {!isLogin ? "Sign Up" : "Log In"}
              </Button>
            )}
            {isLoading && <p>Sending request..</p>}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </Paper>
    </Grid>
  );
};

export default AuthSignUpForm;
