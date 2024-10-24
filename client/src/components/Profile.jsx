import React, { useState } from "react";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarMonthRounded,
  DashboardRounded,
  LogoutRounded,
  PersonRounded,
  SettingsRounded,
} from "@mui/icons-material";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleDashboardOrCalendar = () => {
    if (location.pathname.startsWith("/admin/")) {
      navigate("/calendar");
    } else {
      navigate("/admin/dashboard");
    }
    handleClose();
  };

  const handleProfile = () => {
    navigate("/profile");
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
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <PersonRounded />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>

        {role === "admin" && (
          <MenuItem onClick={handleDashboardOrCalendar}>
            <ListItemIcon>
              {location.pathname.startsWith("/admin/") ? (
                <CalendarMonthRounded />
              ) : (
                <DashboardRounded />
              )}
            </ListItemIcon>
            <ListItemText
              primary={
                location.pathname.startsWith("/admin/")
                  ? "Calendar"
                  : "Dashboard"
              }
            />
          </MenuItem>
        )}

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
