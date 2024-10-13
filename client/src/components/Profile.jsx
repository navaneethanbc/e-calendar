import React, { useState, useEffect } from "react";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Settings, LayoutDashboard } from "lucide-react";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userRole, setUserRole] = useState();
  const username = localStorage.getItem("username");

  const getAdmin = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/getadmin/${username}`
      );
      const role = response.data; // Assuming response contains a 'role' property
      localStorage.setItem("role", role);
      setUserRole(role);
    } catch (error) {
      if (error.response) {
        console.log("Error admin", error.response.data);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  useEffect(() => {
    if (username) {
      getAdmin(username);
    }
  }, [username]);

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

  // Navigate to the admin page
  const navigateToAdmin = () => {
    navigate("/admin/dashboard");
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Avatar />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#E8F5E9", // Change the menu's background color to yellow
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <User size={20} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings size={20} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>

        {/* Navigate to admin page if userRole is ADM */}
        {userRole === "ADM" && (
          <MenuItem onClick={navigateToAdmin}>
            <ListItemIcon>
              <LayoutDashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </MenuItem>
        )}

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogOut size={20} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Profile;
