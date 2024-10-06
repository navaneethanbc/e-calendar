import React, { useState, useEffect } from "react";
import SearchEvent from "./SearchEvent"
import SearchAvailability from "./SearchAvailability"
import Profile from "./Profile";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  Menu as DropMenu,
  Snackbar,
  Alert
} from "@mui/material";
import {
  Menu,
  ArrowBackIosNew,
  ArrowForwardIos,
  Search,
  Notifications,
} from "@mui/icons-material";

const NavigationBar = ({
  handleDrawer,
  handleToday,
  handlePrev,
  handleNext,
  headerTitle,
  selectedView,
  handleSelectView, 
  setResultEvents,
  setShowCalendar,
  searchOpen,
  setSearchOpen,
  searchevent,
  setSearchEvent,
  setResultAvailble,
  setShowAvailable,
  searchAvailable,
  setSearchAvailable
}) => {

  
  //const [errorMessage, setErrorMessage] = useState("") //to store error message from  handle search function
  const [localEvents,setLocalEvents] = useState([]) // to store temporry resultevent 
  //const [openSnackbar,setOpenSnackbar] =useState(false)
  
  //check if events required search componentts  not empty
  const checkContent = () => {
    if((!searchevent.title) && (!searchevent.category) && (!searchevent.from) && (!searchevent.to)){
      return false
    }
    else if (searchevent.from && (!searchevent.to))  {
      //setErrorMessage(" Pleases select date range , end date")
      //setOpenSnackbar(true)
      return false; 
    }
    else if((!searchevent.from) && searchevent.to){
      //setErrorMessage(" please select date range , start date")
      //setOpenSnackbar(true)
      return false
    }
    return true;
  };
  
// function  to send api call for get searched events
  const handleSearch = async () => {
    if (searchOpen && checkContent()) {
      try {
        const response = await axios.post("http://localhost:8000/events/find/", {
          username: localStorage.getItem("username"),
          title: searchevent.title,
          from: searchevent.from,
          to: searchevent.to
        });

        setShowCalendar(false)
        setShowAvailable(false)
  
        if (response.data.events && response.data.events.length > 0) {
          setResultEvents(response.data.events);
          setLocalEvents(response.data.events)
          //setErrorMessage("");
        } 
        else {
          setResultEvents([]);
          setLocalEvents([])
          //setErrorMessage(response.data.message || "No events found");
          //setOpenSnackbar(true)
        }
      }
       catch (error) {
        console.error("Error in searching events:", error);
        setResultEvents([]);
        setLocalEvents([])
        //setErrorMessage(error.response?.data?.message || "An error occurred while searching events");
        //setOpenSnackbar(true)
      } 
    } 
    else {
      setSearchOpen(!searchOpen);
    }
  };

  // const handleCloseSnackbar = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpenSnackbar(false);
  // };
  
  useEffect(()=>{
    if(searchevent.category !== ""){
      const filteredEvents = localEvents.filter((event)=>((event.category.toLowerCase()).includes(searchevent.category.toLowerCase())))
      setResultEvents(filteredEvents)
    }
    else{
      setResultEvents(localEvents)
    }
   
  })
  return (
    <>
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
            <Box
              component="img"
              src="src/assets/icon.png"
              alt="Logo"
              height={50}
              mr={1}
            />
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
            <Box 
            className="flex justify-center mr-8"
            display={searchOpen?"none":""}>
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
            </Box> 
            <Box
              display={!searchOpen?"none":""}>
              <SearchEvent 
              searchevent = {searchevent}
              setSearchEvent = {setSearchEvent}
              /> 
            </Box>
          </Box>
          <Box
            flexGrow={1}
            justifyContent={"right"}
            display={"flex"}
            alignItems={"center"}
          >
            
            <IconButton onClick={handleSearch}>
              <Search sx={{ height: 32, width: 32 }} />
            </IconButton>

            <SearchAvailability 
              setResultAvailble={setResultAvailble}
              setShowAvailable={setShowAvailable}
              searchAvailable={searchAvailable}
              setSearchAvailable={setSearchAvailable}
              setShowCalendar={setShowCalendar}
            />

            <IconButton>
              <Notifications sx={{ height: 32, width: 32 }} />
            </IconButton>
            <div className="flex justify-end ml-4 mr-4">
              <FormControl variant="outlined" size="small" sx={{ 
                width: "95px", 
                height:"2rem",
                color:"black",
                fontSize:"1rem",
                fontFamily:"kanit"}}>
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
            <Profile /> 
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose = {handleCloseSnackbar}
        anchorOrigin ={{vertical:"top", horizontal:"right"
        }}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{width: '50%'}}>
            {errorMessage}
          </Alert>
      </Snackbar> */}
    </>
  );
};

export default NavigationBar;
