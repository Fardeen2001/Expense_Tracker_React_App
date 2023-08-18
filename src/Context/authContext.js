import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  token: "",
  email: "",
  isLoggedIn: false,
  isEmailVerified: false,
  login: (token, email) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialtoken = localStorage.getItem("idtoken");
  const initialEmail = localStorage.getItem("email") || "";
  const [token, setToken] = useState(initialtoken);
  const [verify, setVerify] = useState(false);
  const [email, setEmail] = useState(initialEmail);
  useEffect(() => {
    const EmailVerifyHandler = async () => {
      try {
        const editedEmail = email.replace(/[@.]/g, "");
        const res = await fetch(
          `https://expense-tracker-fardeen-default-rtdb.asia-southeast1.firebasedatabase.app/userVerified${editedEmail}.json`
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
  }, [email]);
  //console.log("ver", verify);

  const userIsLoggedin = !!token;
  const loginHandler = (token, email) => {
    localStorage.setItem("idtoken", token);
    localStorage.setItem("email", email);
    setToken(token);
    setEmail(email);
  };
  const logoutHandler = () => {
    localStorage.removeItem("idtoken");
    localStorage.removeItem("email");
    setToken(null);
    setEmail("");
  };
  const contextValues = {
    token: token,
    email: email,
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
