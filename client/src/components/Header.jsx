import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <div>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ bgcolor: "#ffec80", height: 80 }}
      >
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
            fontSize={{ xs: 35, sm: 45 }}
            fontFamily="Kanit"
            fontWeight="bold"
            color="rgb(54,53,51)"
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
