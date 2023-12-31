import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Home.module.css";
import { Button } from "@mui/material";
//import AuthContext from "../Context/authContext";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseTrackerList from "./ExpenseTrackerList";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/auth";
import { setEmailVerified } from "../Store/emailSlice";

import SwitchModes from "./UI/Switch";
import { premiumAction } from "../Store/premium";

const Home = (props) => {
  //const { email, logout, token, isEmailVerified } = useContext(AuthContext);
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);
  const emailVerified = useSelector((state) => state.email.isEmailVerified);
  const premium = useSelector((state) => state.premium.isPremium);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addExpense, setAddexpense] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const premiumUser = useSelector((state) => state.premium.premiumUser);
  const mode = useSelector((state) => state.darkMode.mode);
  const premiumClickHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(premiumAction.premiumUser(true));
      const editedEmail = email.replace(/[@.]/g, "");
      const res = await fetch(
        `${process.env.REACT_APP_DATABASEID}PremiumUser${editedEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            msg: "Premium User",
            id: `${Math.random() * 10}`,
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("not premium user");
      }
      if (res.ok) {
        dispatch(premiumAction.premiumUser(true));
        localStorage.setItem("premiumUser", true);
      }
      await res.json();
    } catch (error) {}
  };
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(authActions.logout());
    // logout();
    navigate("/auth", { replace: true });
  };
  const verifyHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.REACT_APP_VERIFY, {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("invalid");
      }
      const data = await response.json();

      const editedEmail = email.replace(/[@.]/g, "");
      const res = await fetch(
        `${process.env.REACT_APP_DATABASEID}userVerified${editedEmail}.json`,
        {
          method: "PUT",
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
      dispatch(setEmailVerified.setEmailVerified(true));
      localStorage.setItem("emaliIsVerified", true);
      console.log("dt", dt);
    } catch (error) {
      alert(error.message);
    }
  };

  const fetcher = async () => {
    try {
      const editedEmail = email.replace(/[@.]/g, "");
      const res = await fetch(
        `${process.env.REACT_APP_DATABASEID}userExpenseData${editedEmail}.json`
      );
      if (!res.ok) {
        throw new Error("invalid");
      }
      const data = await res.json();
      // console.log("fetch", Object.keys(data));

      if (data && typeof data === "object") {
        const fetchedExpenses = Object.keys(data).map((firebaseId) => {
          const expense = data[firebaseId];
          return { ...expense, firebaseId };
        });

        setAddexpense(fetchedExpenses);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitHandler = (data) => {
    setAddexpense([...addExpense, data]);
  };
  const deleteHandler = async (firebaseId) => {
    try {
      const editedEmail = email.replace(/[@.]/g, "");
      const res = await fetch(
        `${process.env.REACT_APP_DATABASEID}userExpenseData${editedEmail}/${firebaseId}.json`,
        {
          method: "DELETE",
        }
        //https://expense-tracker-fardeen-default-rtdb.asia-southeast1.firebasedatabase.app/userExpenseDatafardeenahamed2001gmailcom/-Nbu2CQ8xlVEcOe-nzih
      );
      if (!res.ok) {
        throw new Error("invalid deletion");
      }
      await res.json();
      const newExpenses = addExpense.filter(
        (item) => item.firebaseId !== firebaseId
      );
      setAddexpense(newExpenses);
    } catch (error) {
      alert(error.message);
    }
  };
  const editHandler = (item) => {
    const editingNewExpense = addExpense.filter(
      (items) => items.firebaseId !== item.firebaseId
    );
    setAddexpense(editingNewExpense);
    setEditingExpense(item);
  };
  const updateExpenseHandler = (updatedExpense) => {
    const updatedExpenses = addExpense.map((expense) =>
      expense.firebaseId === updatedExpense.firebaseId
        ? updatedExpense
        : expense
    );

    setAddexpense(updatedExpenses);
    setEditingExpense(null);
  };

  return (
    <>
      <nav className={mode ? classes.navDark : classes.navLight}>
        <div>
          <h4>Welcome To Expense Tracker</h4>
          {!emailVerified && (
            <div>
              <Button variant="outlined" onClick={verifyHandler}>
                Verify Your Email
              </Button>
            </div>
          )}
        </div>
        <div className={classes.side}>
          {premium && !premiumUser && (
            <Button
              variant="outlined"
              color={mode ? "secondary" : "primary"}
              onClick={premiumClickHandler}
            >
              Add premium
            </Button>
          )}
          {premiumUser && <SwitchModes />}
          <div>
            <Button
              variant="outlined"
              color={mode ? "secondary" : "primary"}
              className={classes.logout}
              onClick={logoutHandler}
            >
              logout
            </Button>
          </div>

          {!emailVerified && (
            <div className={classes.badge}>
              Your profile is incomplete{" "}
              <NavLink to="/profile">Complete Now</NavLink>
            </div>
          )}
        </div>
      </nav>
      <AddExpenseForm
        onSubmit={onSubmitHandler}
        editExpense={editingExpense}
        onUpdate={updateExpenseHandler}
      />
      {!addExpense.length > 0 && (
        <h3 style={{ textAlign: "center", marginTop: "25%" }}>
          Nothing, Please Add Something!
        </h3>
      )}
      {addExpense.length > 0 && (
        <ExpenseTrackerList
          addExpense={addExpense}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
      )}
    </>
  );
};

export default Home;
