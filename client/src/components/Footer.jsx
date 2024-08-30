import React from "react";
import { AppBar, Toolbar } from "@mui/material";

const Footer = () => {
  return (
    <div>
      <AppBar
        color="transparent"
        position="fixed"
        elevation={1}
        sx={{ top: "auto", bottom: 0 }}
      >
        <Toolbar></Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;
