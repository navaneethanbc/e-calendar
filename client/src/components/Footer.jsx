import React from "react";
import { AppBar, Toolbar } from "@mui/material";

const Footer = () => {
  return (
    <div>
      <AppBar
        color="transparent"
        position="fixed"
        elevation={0}
        sx={{ top: "auto", bottom: 0, bgcolor: "#ffec80", height: 60 }}
      >
        <Toolbar></Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;
