import React, { useState, useEffect } from "react";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import NotificationItem from "./NotificationItem";
import axios from "axios";
import {
  IconButton,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Button,
} from "@mui/material";

const ShowNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState(null);

  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const isOpen = Boolean(anchorEl);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const username = localStorage.getItem("username");
      if (!username) {
        throw new Error("Username not found");
      }
      const response = await axios.get(
        `https://e-calendar-cocq.vercel.app/notifications/${username}`
      );
      setNotifications(response.data.notifications || []);
      setError(null);
    } catch (error) {
      setError("Failed to fetch notifications");
      console.error("Error fetching notifications:", error);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await axios.patch(
        `https://e-calendar-cocq.vercel.app/notifications/mark/${id}`
      );
      await fetchNotifications();
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const username = localStorage.getItem("username");
      await axios.patch(
        `https://e-calendar-cocq.vercel.app/notifications/markall/${username}`
      );
      await fetchNotifications();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleRespond = async (id, response) => {
    try {
      await axios.post(
        `https://e-calendar-cocq.vercel.app/notifications/respond/${id}?response=${response}`
      );
      await handleMarkRead(id);
      // await fetchNotifications();
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, status: response }
            : notification
        )
      );
    } catch (error) {
      console.error("Error responding to notification:", error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    fetchNotifications();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon sx={{ height: "4vh", width: "4vh" }} />
        </Badge>
      </IconButton>

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            width: 400,
            maxHeight: 500,
            overflow: "hidden",
            boxShadow: 3,
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            bgcolor: "beige",
            color: "common.white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color={"black"}>
            Notifications
          </Typography>
          <Button
            size="small"
            disabled={notifications.length === 0}
            onClick={handleMarkAllRead}
            sx={{ textTransform: "none", color: "black" }}
          >
            Mark All as Read
          </Button>
        </Box>

        <List sx={{ maxHeight: 400, overflow: "auto", p: 0 }}>
          {error && (
            <ListItem>
              <ListItemText
                primary={
                  <Typography color="error" align="center">
                    {error}
                  </Typography>
                }
              />
            </ListItem>
          )}

          {!error && notifications.length === 0 ? (
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    No notifications available
                  </Typography>
                }
              />
            </ListItem>
          ) : (
            [...notifications]
              .reverse()
              .map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                  handleMarkRead={handleMarkRead}
                  handleRespond={handleRespond}
                />
              ))
          )}
        </List>
      </Popover>
    </div>
  );
};

export default ShowNotifications;
