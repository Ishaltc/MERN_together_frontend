import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import InputBase from '@mui/material/InputBase';
import { Link } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    toolbar:{
        display: 'flex',
        justifyContent: 'space-between',
    },
  logoLg: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logoSm: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  search:{
    display:"flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  input:{
    color:"white",
    marginLeft:theme.spacing(1)
  
  },
  logout:{
    cursor:"pointer"
  }
}}));

export default function AdminHeader() {

  


  const classes = useStyles();
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.logoLg}>
          <Link to="/admin/login">Together</Link>
        </Typography>
        <Typography variant="h6" className={classes.logoSm}>
          <Link to="/admin/login" className="header_logo">
            <div className="circle">
              <img
                className="side_icon1"
                src="./../icons/together_icon.jpg"
                alt=""
              />
            </div>
          </Link>
        </Typography>
        <div className={classes.search} >
            <SearchIcon />
            <InputBase placeholder="Search...." className={classes.input}/>
        </div>
        <div className={classes.search} style={{color:"red"}}>
         
<LogoutIcon className={classes.logout}/>

        </div>
      </Toolbar>
    </AppBar>
  );
}
