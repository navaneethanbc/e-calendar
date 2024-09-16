import React, { useState } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, Popover, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Search as SearchIcon, PersonSearch as PersonSearchIcon, AccountCircle as AccountCircleIcon,  Notifications as NotificationsIcon } from '@mui/icons-material';

const SearchAvailable = ({ searchQuery, setSearchQuery, startDate, setStartDate, endDate, setEndDate, category, setCategory, handleSubmit,notifications }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [openAvailability, setOpenAvailability] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);

  const toggleSearch = () => {
    setShowSearch(!showSearch)
  }
  const toggleAvailability = () => {
    setOpenAvailability(!openAvailability)
  }

  const handleNotificationClick = (e) => {
    setAnchorElement(e.currentTarget)
  }
  
  const handleNotificationClose = () => {
    setAnchorElement(null);
  }
  const openNotifications = Boolean(anchorElement);

  // const notifications = [
  //   { id: 1, content: "In21-S5-MA2024 - Calculus new content", time: "2 days 7 hours ago" },
  //   { id: 2, content: "In21-S5-MA2024 - Calculus new content", time: "2 days 7 hours ago" },
  //   { id: 3, content: "In21-S5-MA2024 - Calculus content change", time: "7 days 21 hours ago" },
  //   { id: 4, content: "In21-S4-MA2054 - Graph Theory new content", time: "14 days 14 hours ago" },
  //   { id: 5, content: "In21-S5-CS3053 - Computer Security content change", time: "14 days 14 hours ago" },
  // ];

  return (
    <div className="flex justify-end items-center w-full p-4">
        {showSearch && (
        <div> 
            <form className="flex space-x-4 items-end ml-auto" onSubmit={handleSubmit}>
            <TextField
                value={searchQuery}
                type="text"
                placeholder="Search title"
                variant="outlined"
                size="small"
                onChange={(e) => setSearchQuery(e.target.value)}
                inputProps={{
                    style:{
                        border:"none",
                        padding:'0.9rem',
                        fontSize:'1rem',
                        margin:'5px'
                    }
                }}
            />
            <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                variant="outlined"
                size="small"
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="personal">Personal</MenuItem>
                <MenuItem value="branch">Branch</MenuItem>
                <MenuItem value="organization">Organization</MenuItem>
            </Select>
            <TextField
                value={startDate}
                type="date"
                variant="outlined"
                size="small"
                onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
                value={endDate}
                type="date"
                variant="outlined"
                size="small"
                onChange={(e) => setEndDate(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="medium"
              style={{ textTransform: 'none', marginRight:"10px" }}
            >
              Search
            </Button>
            </form>
        </div>
      )}

      <IconButton onClick={toggleSearch} className="ml-4">
        <SearchIcon />
      </IconButton>
      <IconButton onClick={toggleAvailability} className="ml-4">
        <PersonSearchIcon />
      </IconButton>
      <IconButton onClick={handleNotificationClick} className="ml-4">
        <NotificationsIcon />
      </IconButton>
      <IconButton className="ml-4 ">
        <AccountCircleIcon />
      </IconButton>

      <Popover
        open={openNotifications}
        anchorEl={anchorElement}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical:"bottom",
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List sx={{ width: '350px', maxHeight: '450px', overflow: 'auto' }}>
          <ListItem>
            <ListItemText primary={<Typography variant="h5">Notifications</Typography>} />
          </ListItem>
          {notifications.length > 0 ?(
            notifications.map((notification) => (
              <ListItem key={notification.id} divider >
                <ListItemText
                  primary={notification.content}
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {notification.time}
                      </Typography>
                      <Button color="primary" size="small">View full notification</Button>
                    </>
                  }
                />
              </ListItem>
            ))
          ): 
            <ListItem>
              <ListItemText primary="no notification available" />
            </ListItem>
          }
          <ListItem>
            <Button fullWidth color="primary">See all</Button>
          </ListItem>
        </List>
      </Popover>

      <Dialog open={openAvailability} onClose={toggleAvailability}>
        <DialogTitle>Availability</DialogTitle>
        <DialogContent>
          This is the availability popup content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleAvailability}>Close</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default SearchAvailable;