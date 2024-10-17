import React, { useState } from "react";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  DashboardRounded,
  LogoutRounded,
  PersonRounded,
  SettingsRounded,
} from "@mui/icons-material";

const Profile = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const role = localStorage.getItem("role");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick} sx={{ mr: -2 }}>
        <Avatar />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "beige",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <PersonRounded />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>

        <MenuItem sx={{ display: role === "admin" ? "content" : "none" }}>
          <ListItemIcon>
            <DashboardRounded />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <SettingsRounded />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutRounded />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Profile;
