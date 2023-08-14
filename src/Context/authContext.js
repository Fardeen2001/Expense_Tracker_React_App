import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  isEmailVerified: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialtoken = localStorage.getItem("idtoken");
  const [token, setToken] = useState(initialtoken);
  const [verify, setVerify] = useState(false);
  useEffect(() => {
    const EmailVerifyHandler = async () => {
      try {
        const res = await fetch(
          "https://expense-tracker-fardeen-default-rtdb.asia-southeast1.firebasedatabase.app/userVerified.json"
        );
        if (!res.ok) {
          throw new Error("email is not verified");
        }
        const data = await res.json();
        setVerify(!!data);
        console.log("fardeen", data);
      } catch (error) {
        alert(error.message);
      }
    };
    EmailVerifyHandler();
  }, []);
  console.log("ver", verify);

  const userIsLoggedin = !!token;
  const loginHandler = (token) => {
    localStorage.setItem("idtoken", token);
    setToken(token);
  };
  const logoutHandler = () => {
    localStorage.removeItem("idtoken");
    setToken(null);
  };
  const contextValues = {
    token: token,
    isLoggedIn: userIsLoggedin,
    isEmailVerified: verify,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValues}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
