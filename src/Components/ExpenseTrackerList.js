import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import classes from "./ExpenseTrackerList.module.css";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
const CategoryIcons = {
  Food: <FastfoodIcon />,
  Fuel: <LocalGasStationIcon />,
  Groceries: <LocalGroceryStoreIcon />,
  Other: <DevicesOtherIcon />,
};
const ExpenseTrackerList = (props) => {
  return (
    <Grid className={classes.grid}>
      <Paper elevation={20} className={classes.paper}>
        <List className={classes.list}>
          {props.addExpense.map((item) => (
            <ListItem key={item.id} className={classes.listitems}>
              <ListItemAvatar>
                <Avatar>{CategoryIcons[item.category]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Rs ${item.price}`}
                secondary={item.description}
              />
              <ListItemText primary={item.category} secondary={item.date} />
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grid>
  );
};

export default ExpenseTrackerList;
