import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";

import { Menu } from "@mui/icons-material";

import image from "../../assets/icon.png";
import Profile from "../Profile";

const AdminHeader = ({ handleDrawer }) => {
  return (
    <AppBar
      position="static"
      variant="outlined"
      sx={{ bgcolor: "#fee27f", height: 64 }}
    >
      <Toolbar>
        <Box display={"flex"} alignItems={"center"}>
          <IconButton
            edge="start"
            color="#616161"
            aria-label="menu"
            onClick={handleDrawer}
          >
            <Menu />
          </IconButton>
          <Box component="img" src={image} alt="Logo" height={50} mr={1} />
          <div className="flex justify-start">
            <Typography
              variant="h1"
              fontFamily={"Kanit"}
              fontSize={{ xs: 20, sm: 24 }}
              color={"#363533"}
              flexGrow={1}
            >
              Calendar
            </Typography>
          </div>
        </Box>
        <Box
          flexGrow={1}
          justifyContent={"right"}
          display={"flex"}
          alignItems={"center"}
        >
          <Profile />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
