import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import logo from "../assets/icon.png";

const Header = () => {
  return (
    <Box height={{ xs: "8vh", md: "11vh" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bottom: "auto",
          top: 0,
          bgcolor: "#ffec80",
        }}
      >
        <Toolbar>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            height={{ xs: "8vh", md: "11vh" }}
            mr={{ xs: 2, md: 3 }}
            ml={{ xs: -1, md: 3 }}
          />

          <Typography
            component="text"
            fontSize={{ xs: "4vh", md: "6vh" }}
            fontFamily="Kanit"
            fontWeight="bold"
            color="#363533"
          >
            Calendar
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
