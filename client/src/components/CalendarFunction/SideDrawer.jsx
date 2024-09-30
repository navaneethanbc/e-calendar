import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import MyDatePicker from "./DayPicker";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SideDrawer = ({
  open,
  selected,
  onSelect,
  onCategoryChange,
  handleSelectView,
  select,
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

  const handleCatagoryChecked = (event) => {
    const { id, checked } = event.target;
    setSelectedCategories((prev) => ({ ...prev, [id]: checked }));
    onCategoryChange(id, checked);
  };

  const handleButtonClick = (value) => {
    setSelectedView(value);
    handleSelectView(value);
  };

  const isSelected = (view) => selectedView === view;

  return (
    <Box
      height="calc(100vh - 64px)"
      bgcolor={"beige"}
      width={open ? "25%" : "0%"}
      sx={{
        transition: "width 0.3s",
        overflow: "hidden",
        "@media (max-width:1200px)": { width: open ? "32%" : "0%" },
        "@media (max-width:768px)": { width: open ? "100%" : "0%" }, // Full width on mobile
      }}
    >
      <Box position={"relative"} top={100} sx={{ transition: "width 0.3s" }}>
        {!isMobile ? (
          <div className="items-center mb-4 border-b-4 border-gray-300">
            <MyDatePicker selected={selected} onSelect={onSelect} />
          </div>
        ) : (
          <>
            <Box display="flex" alignItems="center">
              <Box
                component="img"
                src="src/assets/icon.png"
                alt="Logo"
                height={50}
                mr={1}
              />
              <Typography
                variant="h1"
                fontFamily={"Kanit"}
                fontSize={{ xs: 20, sm: 24 }}
                color={"#363533"}
                flexGrow={1}
              >
                Calendar
              </Typography>
            </Box>

            <br />

            <div className="flex flex-col">
              <button
                className={`flex items-center px-4 py-4 font-bold border-t-4 border-gray-300 btn ${
                  isSelected("timeGridDay") ? "text-yellow-700" : "text-black"
                }`}
                value="timeGridDay"
                onClick={() => handleButtonClick("timeGridDay")}
              >
                <i className="mr-3 fas fa-calendar-day"></i>Day
              </button>

              <button
                className={`flex items-center px-4 py-4 font-bold border-t-4 border-gray-300 btn ${
                  isSelected("timeGridWeek") ? "text-yellow-700" : "text-black"
                }`}
                value="timeGridWeek"
                onClick={() => handleButtonClick("timeGridWeek")}
              >
                <i className="mr-3 icon fa fa-calendar-week"></i> Week
              </button>

              <button
                className={`flex items-center px-4 py-4 font-bold border-t-4 border-gray-300 btn ${
                  isSelected("dayGridMonth") ? "text-yellow-700" : "text-black"
                }`}
                value="dayGridMonth"
                onClick={() => handleButtonClick("dayGridMonth")}
              >
                <i className="mr-3 icon fa fa-calendar-alt"></i> Month
              </button>

              <button
                className={`flex items-center px-4 py-4 font-bold border-t-4 border-b-4 border-gray-300 btn ${
                  isSelected("listWeek") ? "text-yellow-700" : "text-black"
                }`}
                value="listWeek"
                onClick={() => handleButtonClick("listWeek")}
              >
                <i className="mr-3 icon fa fa-list"></i> List
              </button>
              <br />
            </div>
          </>
        )}

        <div className="flex flex-col">
          {["Personal", "Branch", "Bank"].map((category) => (
            <div key={category} className="flex flex-col px-4 mb-3 space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  id={category}
                  type="checkbox"
                  className="w-4 h-4 form-checkbox"
                  style={{
                    accentColor:
                      category === "Personal"
                        ? "#b8860b"
                        : category === "Branch"
                        ? "#00008b"
                        : "#FF0000",
                  }}
                  onChange={handleCatagoryChecked}
                  checked={selectedCategories[category]}
                />
                <label htmlFor={category} className="font-medium text-gray-700">
                  {category}
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center px-4 mt-2 space-x-2 border-t-4 border-gray-300">
          <a href="calendar/help" style={{ textDecoration: "underline" }}>
            <br />
            <i className="mr-3 fas fa-question-circle"></i>
            Help and Feedback
          </a>
        </div>
      </Box>
    </Box>
  );
};

export default SideDrawer;
