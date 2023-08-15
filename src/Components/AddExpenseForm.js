import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useContext, useEffect, useState } from "react";
import classes from "./AddExpenseForm.module.css";
import AuthContext from "../Context/authContext";

const AddExpenseForm = (props) => {
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [Category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const { email } = useContext(AuthContext);
  useEffect(() => {
    if (props.editExpense) {
      setPrice(props.editExpense.price.toString());
      setDescription(props.editExpense.description);
      setCategory(props.editExpense.category);
      setDate(props.editExpense.date);
    }
  }, [props.editExpense]);
  const priceHandleChange = (event) => {
    setPrice(event.target.value);
  };
  const descHandleChange = (event) => {
    setDescription(event.target.value);
  };
  const categoryHandleChange = (event) => {
    setCategory(event.target.value);
  };
  const dateHandelChange = (event) => {
    setDate(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      price.trim === "" ||
      description.trim === "" ||
      description.length < 3 ||
      Category === "None"
    ) {
      alert("Please enter a valid data");
      return;
    }
    const data = {
      id: Math.random().toString(),
      price: +price,
      description: description,
      category: Category,
      date: date,
    };

    try {
      const editedEmail = email.replace(/[@.]/g, "");
      const res = await fetch(
        `https://expense-tracker-fardeen-default-rtdb.asia-southeast1.firebasedatabase.app/userExpenseData${editedEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            ...data,
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
      const newData = { ...data, firebaseId: dt.name };
      props.onSubmit(newData);
    } catch (error) {
      alert(error.message);
    }
    setPrice("");
    setDescription("");
  };

  return (
    <Grid className={classes.grid}>
      <Paper elevation={20} className={classes.paper}>
        <h1 className={classes.header}>ADD YOUR EXPENSES HERE</h1>
        <form onSubmit={submitHandler}>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl fullWidth required sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Amount
              </InputLabel>
              <Input
                value={price}
                onChange={priceHandleChange}
                id="standard-adornment-amount"
                type="number"
                startAdornment={
                  <InputAdornment position="start">Rs</InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard" required fullWidth sx={{ m: 1 }}>
              <TextField
                required
                value={description}
                onChange={descHandleChange}
                id="outlined-required text"
                label="Description"
                variant="standard"
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth required variant="standard" sx={{ m: 1 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={Category}
                onChange={categoryHandleChange}
                label="Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Fuel">Fuel</MenuItem>
                <MenuItem value="Groceries">Groceries</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" required fullWidth sx={{ m: 1 }}>
              <TextField
                id="standard-number"
                label="Add Date"
                type="date"
                value={date}
                onChange={dateHandelChange}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
            </FormControl>
            <Button type="submit" variant="outlined" endIcon={<SendIcon />}>
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
};

export default AddExpenseForm;
