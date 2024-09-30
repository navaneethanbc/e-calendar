import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  Popover,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Search as SearchIcon,
  PersonSearch as PersonSearchIcon,
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import Notifications from "../NotificationPopUp";
import AvailabilityCheck from "./AvailabilityCheck";

const SearchAvailable = ({
  searchQuery,
  setSearchQuery,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  category,
  setCategory,
  notifications,
  showSearch,
  setShowSearch,
  selectedView,
  handleSelectView,
}) => {
  const [openAvailability, setOpenAvailability] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // State for Notifications popup
  const [anchorElement, setAnchorElement] = useState(null);
  const[username, setUserName]= useState('')
  const [isavailablefrom, setIsAvailableFrom]= useState('')
  const [isavailableto, setIsAvailableTo]= useState('')

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleAvailability = () => {
    setOpenAvailability(!openAvailability);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClose = () => {
    setAnchorElement(null);
  };

  const openNotifications = Boolean(anchorElement);

  return (
    <div className="flex items-center justify-end w-full p-4">
      {showSearch && (
        <div>
          <form
            className="flex items-end ml-auto space-x-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <TextField
              value={searchQuery}
              type="text"
              placeholder="Search title"
              variant="outlined"
              size="small"
              onChange={(e) => setSearchQuery(e.target.value)}
              inputProps={{
                style: {
                  border: "none",
                  padding: "0.5rem",
                  fontSize: "1rem",
                  margin: "0",
                },
              }}
            />
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              variant="outlined"
              size="small"
            >
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="branch">Branch</MenuItem>
              <MenuItem value="bank">Bank</MenuItem>
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
              style={{ textTransform: "none", marginRight: "10px" }}
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

      {/* this  select portion should be move to anoter place in calendar component */}
      {/* <label htmlFor="viewSelect" className="sr-only">
        Select View
      </label>
      <select
        id="viewSelect"
        name="viewSelect"
        className="px-2 py-1 border rounded"
        value={selectedView}
        onChange={handleSelectView}
      >
        <option value="timeGridDay">Day</option>
        <option value="timeGridWeek">Week</option>
        <option value="dayGridMonth">Month</option>
        <option value="multiMonthYear">Year</option>
      </select> */}
      <IconButton className="ml-4 ">
        <AccountCircleIcon />
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

      <Dialog open={openAvailability} onClose={toggleAvailability}>
        <DialogTitle>Availability</DialogTitle>
        <DialogContent>
          <AvailabilityCheck 
            username={username}
            setUserName={setUserName}
            isavailablefrom={isavailablefrom}
            setIsAvailableFrom={setIsAvailableFrom}
            isavailableto={isavailableto}
            setIsAvailableTo = {setIsAvailableTo}/>
            
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleAvailability}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SearchAvailable;
