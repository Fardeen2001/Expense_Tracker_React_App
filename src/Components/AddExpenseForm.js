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
import React, { useState } from "react";
import classes from "./AddExpenseForm.module.css";

const AddExpenseForm = () => {
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [Category, setCategory] = useState("");
  const priceHandleChange = (event) => {
    setPrice(event.target.value);
  };
  const descHandleChange = (event) => {
    setDescription(event.target.value);
  };
  const categoryHandleChange = (event) => {
    setCategory(event.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Grid className={classes.grid}>
      <Paper elevation={20} className={classes.paper}>
        <h1>ADD YOUR EXPENSES HERE</h1>
        <form onSubmit={submitHandler}>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
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
            <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
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
