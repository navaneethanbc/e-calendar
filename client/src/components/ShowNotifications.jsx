import React from 'react'
import {List,ListItem,ListItemText,Button,IconButton,Typography,Popover} from '@mui/material'
import {Notifications as NotificationsIcon,} from '@mui/icons-material'
import { useState } from 'react';
import axios from 'axios';

const ShowNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [anchorElement, setAnchorElement] = useState(null); // to handle notification popover

    const handleNotificationClick = (e) => {
        setAnchorElement(e.target)
      };
    
    const handleNotificationClose = () => {
        setAnchorElement(null);
      };
    
    const openNotifications = Boolean(anchorElement);

    const handleFetchNotifications = async()=>{
        const response = await axios.get(`http://localhost:8000/notifications/${username}`)
    setNotifications(response.data)
    }

    

  return (
    <div>
        <IconButton onClick={handleNotificationClick}>
            <NotificationsIcon
              sx={{ height: "4vh", width: "4vh",}}
            />
        </IconButton>
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
    </div>
  )
}

export default ShowNotifications