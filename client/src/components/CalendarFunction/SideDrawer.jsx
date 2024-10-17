import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import MyDatePicker from "./DayPicker";
import {
  CalendarMonthRounded,
  CalendarTodayRounded,
  EventAvailableRounded,
  HelpOutlineRounded,
  ListRounded,
  SearchRounded,
  ViewWeekRounded,
} from "@mui/icons-material";

const SideDrawer = ({
  open,
  selected,
  onSelect,
  onCategoryChange,
  handleSelectView,
  select,
  setOpen,
}) => {
  const [selectedCategories, setSelectedCategories] = useState({
    Personal: true,
    Branch: true,
    Bank: true,
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedView, setSelectedView] = useState(select);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (select) {
      setSelectedView(select);
    }
  }, [select]);

  const handleCategoryChecked = (event) => {
    const { id, checked } = event.target;
    setSelectedCategories((prev) => ({ ...prev, [id]: checked }));
    onCategoryChange(id, checked);
  };

  const handleButtonClick = (value) => {
    setSelectedView(value);
    handleSelectView(value);
    setOpen((prevOpen) => {
      const newOpen = !prevOpen;
      localStorage.setItem("drawerOpen", newOpen); // Save new state to local storage
      return newOpen;
    });
  };

  const isSelected = (view) => selectedView === view;

  return (
    <Box
      height={{ sm: "91.6vh", xs: "92.6vh" }}
      bgcolor={"beige"}
      width={!open ? 0 : { md: "25vw", sm: "54vw", xs: "100vw" }}
      sx={{
        transition: "width 0.3s",
        overflow: "hidden",
      }}
    >
      <Box position={"relative"} top={100} sx={{ transition: "width 0.3s" }}>
        {!isMobile ? (
          <Box mt={"1vh"} mb={"1vh"} height="40vh">
            <MyDatePicker selected={selected} onSelect={onSelect} />
          </Box>
        ) : (
          // mobile size
          <Box
            ml={3}
            className="flex flex-col text-[12px] sm:text-[15px] md:text-[14px] lg:text-[16px]"
          >
            <Button
              startIcon={<CalendarTodayRounded />}
              onClick={() => handleButtonClick("timeGridDay")}
              sx={{
                textTransform: "none",
                justifyContent: "flex-start",
                color: isSelected("timeGridDay") ? "#f0c987" : "#363533",
                fontSize: "2.4vh",
              }}
            >
              Day View
            </Button>

            <Button
              startIcon={<ViewWeekRounded />}
              onClick={() => handleButtonClick("timeGridWeek")}
              sx={{
                textTransform: "none",
                justifyContent: "flex-start",
                color: isSelected("timeGridWeek") ? "#f0c987" : "#363533",
                fontSize: "2.4vh",
              }}
            >
              Week View
            </Button>

            <Button
              startIcon={<CalendarMonthRounded />}
              onClick={() => handleButtonClick("dayGridMonth")}
              sx={{
                textTransform: "none",
                justifyContent: "flex-start",
                color: isSelected("dayGridMonth") ? "#f0c987" : "#363533",
                fontSize: "2.4vh",
              }}
            >
              Month View
            </Button>

            <Button
              startIcon={<ListRounded />}
              onClick={() => handleButtonClick("listWeek")}
              sx={{
                textTransform: "none",
                justifyContent: "flex-start",
                color: isSelected("listWeek") ? "#f0c987" : "#363533",
                fontSize: "2.4vh",
              }}
            >
              List View
            </Button>
          </Box>
        )}

        <Box display="flex" flexDirection="column" mt={3} ml={7}>
          {["Personal", "Branch", "Bank"].map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  id={category}
                  checked={selectedCategories[category]}
                  onChange={handleCategoryChecked}
                  sx={{
                    color:
                      category === "Personal"
                        ? "#d4a5a5"
                        : category === "Branch"
                        ? "#769fcd"
                        : "#b0c4b1",
                    "&.Mui-checked": {
                      color:
                        category === "Personal"
                          ? "#d4a5a5"
                          : category === "Branch"
                          ? "#769fcd"
                          : "#b0c4b1",
                    },
                  }}
                />
              }
              label={category}
              sx={{ color: "#363533" }}
            />
          ))}
        </Box>

        <Box
          display={{ xs: "flex", sm: "none" }}
          flexDirection={"column"}
          gap={1}
          mt={3}
          ml={3}
        >
          <Button
            size="medium"
            startIcon={<SearchRounded />}
            sx={{
              color: "#363533",
              bgcolor: "transparent",
              width: "45vw",
              textTransform: "none",
              fontSize: "2.4vh",
              justifyContent: "flex-start",
            }}
          >
            Search Events
          </Button>
          <Button
            size="medium"
            startIcon={<EventAvailableRounded />}
            sx={{
              color: "#363533",
              bgcolor: "transparent",
              width: "45vw",
              textTransform: "none",
              fontSize: "2.4vh",
              justifyContent: "flex-start",
            }}
          >
            Check Availability
          </Button>
        </Box>

        <Box ml={3} position={"absolute"} bottom={-150}>
          <a
            href="calendar/help"
            style={{ textDecoration: "underline", fontSize: "2.4vh" }}
          >
            <HelpOutlineRounded />
            Help and Feedback
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default SideDrawer;
