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
  MenuItem,
  Menu as DropMenu,
} from "@mui/material";
import {
  Menu,
  ArrowBackIosNew,
  ArrowForwardIos,
  Search,
  EventAvailableTwoTone,
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
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

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
          <IconButton>
            <Notifications sx={{ height: 32, width: 32 }} />
          </IconButton>
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
