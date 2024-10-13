import React, { useState } from 'react';
import { IconButton, Avatar, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Settings } from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

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
            <IconButton onClick={handleClick} >
                <Avatar />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{ 
                    "& .MuiPaper-root": {
                        backgroundColor: "#E8F5E9",  // Change the menu's background color to yellow
                    }
                }}
            >
                <MenuItem >
                    <ListItemIcon>
                        <User size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </MenuItem>

                <MenuItem >
                    <ListItemIcon>
                        <Settings size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogOut size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </MenuItem>
            </Menu>
        </div>
    );
}

export default Profile;