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
import { useSelector } from "react-redux";
const CategoryIcons = {
  Food: <FastfoodIcon />,
  Fuel: <LocalGasStationIcon />,
  Groceries: <LocalGroceryStoreIcon />,
  Other: <DevicesOtherIcon />,
};
const ExpenseTrackerList = (props) => {
  const mode = useSelector((state) => state.darkMode.mode);
  return (
    <Grid className={classes.grid}>
      <Paper
        elevation={20}
        className={mode ? classes.paperDark : classes.paper}
      >
        <List className={classes.list}>
          {props.addExpense.map((item) => (
            <ListItem
              key={item.id}
              className={mode ? classes.listitemsDark : classes.listitems}
            >
              <ListItemAvatar className={classes.avatar}>
                <Avatar>{CategoryIcons[item.category]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Rs ${item.price}`}
                secondary={item.description}
                className={mode ? classes.textDark : ""}
              />
              <ListItemText
                primary={item.category}
                secondary={item.date}
                className={mode ? classes.textDark : ""}
              />
              <Tooltip title="Edit" placement="top">
                <IconButton
                  aria-label="Edit"
                  onClick={() => {
                    props.editHandler(item);
                  }}
                  className={mode ? classes.iconsDark : ""}
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
                  className={mode ? classes.iconsDark : ""}
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
