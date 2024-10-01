import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      height={{ md: "8vh", sm: "4vh" }}
      display={{ xs: "none", md: "block" }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: "auto",
          bottom: 0,
          bgcolor: "#ffec80",
        }}
      >
        <Toolbar></Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;
