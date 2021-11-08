import React from "react";
import './Header.css'
import logo from './../../assets/logo.jpeg'
import {Button} from "@material-ui/core";

const Header = (props) => {
  return (
    <div className="main-header-container">
      <img src={logo} alt="logo loading..."/>
      &nbsp;&nbsp;
      <span id="header-title"> Doctor Finder </span>
      <Button
        id="session-btn"
        variant="contained"
        color={props.isLogin ? "secondary" : "primary"}
        size="medium"
        onClick={() => {
          if (props.isLogin)
            props.handleLogout();
          else
            props.openModel();
        }}
      >
        {props.isLogin? "Logout" : "Login"}
      </Button>


    </div>
  );
};

export default Header;
