import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
} from "@mui/material";
import classes from "./ExpenseTrackerList.module.css";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
              <Tooltip title="Edit" placement="top">
                <IconButton
                  aria-label="Edit"
                  onClick={() => {
                    props.editHandler(item);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" placement="top">
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    props.deleteHandler(item.firebaseId);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grid>
  );
};

export default ExpenseTrackerList;
