import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Button,
  FormControl,
  Select,
  List,
  ListItem,
  ListItemText,
  Popover,
  MenuItem,
  Menu as DropMenu,
} from "@mui/material";
import {
  Menu,
  ArrowBackIosNew,
  ArrowForwardIos,
  Search,
  EventAvailableTwoTone,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import logo from "../assets/icon.png";

import Notifications from "./NotificationPopUp";

const NavigationBar = ({
  handleDrawer,
  handleToday,
  handlePrev,
  handleNext,
  headerTitle,
  selectedView,
  notifications,
  handleSelectView,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClose = () => {
    setAnchorElement(null);
  };

  const openNotifications = Boolean(anchorElement);

  return (
    <AppBar
      position="static"
      variant="outlined"
      sx={{ bgcolor: "#febe00", height: 64 }}
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
          <Box component="img" src={logo} alt="Logo" height={50} mr={1} />
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

          <div className="flex justify-start p-2 ml-10 mr-8">
            <Button
              onClick={handleToday}
              variant="contained"
              size="small"
              disableElevation
              sx={{
                backgroundColor: "beige",
                ":hover": {
                  backgroundColor: "#dedede",
                },
              }}
            >
              <Typography
                textTransform={"none"}
                color={"#363533"}
                fontFamily={"Kanit"}
              >
                Today
              </Typography>
            </Button>
            <IconButton
              onClick={handlePrev}
              sx={{ color: "#363533", ml: 3, mr: 1 }}
            >
              <ArrowBackIosNew />
            </IconButton>
            <IconButton onClick={handleNext} sx={{ color: "#363533" }}>
              <ArrowForwardIos />
            </IconButton>
          </div>
          <div className="flex justify-center mr-8">
            <Typography
              variant="h4"
              align="center"
              width={{ xs: 120, sm: 280 }}
              overflow={"hidden"}
              fontFamily={"Kanit"}
              fontSize={{ xs: 12, sm: 20 }}
              color={"#363533"}
            >
              {headerTitle}
            </Typography>
          </div>
        </Box>
        <Box
          flexGrow={1}
          justifyContent={"right"}
          display={"flex"}
          alignItems={"center"}
        >
          <IconButton>
            <Search sx={{ height: 32, width: 32 }} />
          </IconButton>
          <IconButton>
            <EventAvailableTwoTone sx={{ height: 32, width: 32 }} />
          </IconButton>
          <IconButton onClick={handleNotificationClick}>
            <NotificationsIcon sx={{ height: 32, width: 32 }} />
          </IconButton>
          {showNotifications && (
            <Notifications onHide={() => setShowNotifications(false)} />
          )}

          <Popover
            open={openNotifications}
            anchorEl={anchorElement}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <List sx={{ width: "350px", maxHeight: "450px", overflow: "auto" }}>
              <ListItem>
                <ListItemText
                  primary={<Typography variant="h5">Notifications</Typography>}
                />
              </ListItem>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <ListItem key={notification.id} divider>
                    <ListItemText
                      primary={notification.content}
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {notification.time}
                          </Typography>
                          <Button color="primary" size="small">
                            View full notification
                          </Button>
                        </>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="no notification available" />
                </ListItem>
              )}
              <ListItem>
                <Button fullWidth color="primary">
                  See all
                </Button>
              </ListItem>
            </List>
          </Popover>

          <div className="flex justify-end ml-4 mr-4">
            <FormControl variant="outlined" size="small" sx={{ width: 95 }}>
              <Select
                size="small"
                labelId="viewSelect-label"
                id="viewSelect"
                value={selectedView}
                onChange={(e) => handleSelectView(e.target.value)}
              >
                <MenuItem value="timeGridDay">Day</MenuItem>
                <MenuItem value="timeGridWeek">Week</MenuItem>
                <MenuItem value="dayGridMonth">Month</MenuItem>
                <MenuItem value="listWeek">List</MenuItem>
              </Select>
            </FormControl>
          </div>
          <IconButton onClick={handleLogout} sx={{ mr: -2 }}>
            <Avatar />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
