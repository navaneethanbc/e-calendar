import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <div>
      <AppBar color="transparent" position="fixed" elevation={1}>
        <Toolbar>
          <Box
            component="img"
            src="src/assets/icon.png"
            alt="Logo"
            height={{ xs: 70, sm: 100 }}
            mr={{ xs: 1, sm: 3 }}
            ml={{ xs: -1, sm: 3 }}
            display={{ xs: "block", sm: "block" }}
          />

          <Typography
            component="text"
            fontSize={{ xs: 35, sm: 50 }}
            fontFamily="Kanit"
            fontWeight="bold"
            color="rgb(54,53,51)"
            mt={{ xs: 1.85, sm: 2.75 }}
            display={{ xs: "block", sm: "block" }}
          >
            Calendar
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
