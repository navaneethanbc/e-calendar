import { ListItem, ListItemText, Box, Typography, Button } from "@mui/material";
import { Circle as CircleIcon } from "@mui/icons-material";

const NotificationItem = ({ notification, handleMarkRead, handleRespond }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ListItem
      divider
      sx={{
        bgcolor: notification.is_read
          ? "transparent"
          : "rgba(250, 150, 250, 0.1)",
        transition: "background-color 0.2s",
        "&:hover": {
          bgcolor: "action.hover",
        },
      }}
    >
      <ListItemText
        disableTypography
        primary={
          <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
            {!notification.is_read && (
              <CircleIcon sx={{ fontSize: 8, color: "primary.main" }} />
            )}
            <Typography
              variant="subtitle2"
              sx={{
                textTransform: "uppercase",
                fontWeight: notification.is_read ? "normal" : "bold",
              }}
            >
              {notification.category}
            </Typography>
          </Box>
        }
        secondary={
          <Box>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                whiteSpace: "pre-line",
                mb: 1,
                fontWeight: notification.is_read ? "normal" : "medium",
              }}
            >
              {notification.description}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {formatDate(notification.designated_time)}
              </Typography>
              {!notification.is_read && (
                <Button
                  onClick={() => handleMarkRead(notification._id)}
                  size="small"
                  sx={{ textTransform: "none" }}
                >
                  Mark as Read
                </Button>
              )}
            </Box>

            {notification.category === "invite" &&
              !notification.status &&
              !notification.is_read && (
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Button
                    size="small"
                    onClick={() => {
                      handleRespond(notification._id, "accepted");
                      notification.status = "accepted";
                    }}
                    variant="contained"
                    color="success"
                    sx={{ textTransform: "none" }}
                  >
                    Accept
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      handleRespond(notification._id, "declined");
                      notification.status = "declined";
                    }}
                    variant="contained"
                    color="error"
                    sx={{ textTransform: "none" }}
                  >
                    Decline
                  </Button>
                </Box>
              )}

            {(notification.status ||
              (notification.category === "invite" && notification.is_read)) && (
              <Typography
                variant="caption"
                sx={{
                  color:
                    notification.status === "declined"
                      ? "error.main"
                      : "success.main",
                  display: "block",
                  mt: 1,
                }}
              >
                {notification.status === "declined" ? "Declined"  : "Accepted" }
              </Typography>
            )}
          </Box>
        }
      />
    </ListItem>
  );
};

export default NotificationItem;
