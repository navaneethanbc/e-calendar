import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <div>
      <AppBar
        position="absolute"
        elevation={0}
        sx={{
          top: 0,
          bottom: "auto",
          bgcolor: "white",
          borderBottom: 0.1,
          borderBottomColor: "silver",
          maxHeight: "88px",
        }}
      >
        <Toolbar>
          <Box
            component="img"
            src="src/assets/icon.png"
            alt="Logo"
            sx={{
              height: 100,
              mr: 3,
              ml: 3,
            }}
          />
          <Typography
            variant="h3"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Kanit",
              fontWeight: "bold",
              color: "rgb(54,53,51)",
              mt: 2.75,
              display: { xs: "inline-block", sm: "block" },
            }}
          >
            Calendar
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
