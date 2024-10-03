import React, { useState, useRef, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { EventModal, SearchModal } from "./Modals";
import axios from "axios";

import NavigationBar from "./NavigationBar";
import SideDrawer from "./SideDrawer";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { CreateButton } from "./CreateButton";

const TheCalendar = () => {
  const calendarRef = useRef(null);
  const [open, setOpen] = useState(() => {
    return localStorage.getItem("drawerOpen") === "true"; // Restore drawer state from local storage
  });
  const [selectedView, setSelectedView] = useState(
    () => localStorage.getItem("calendarView") || "dayGridMonth"
  );
  const [headerTitle, setHeaderTitle] = useState("");
  const [categories, setCategories] = useState({
    personal: false,
    branch: false,
    bank: false,
  });
  const [events, setEvents] = useState([]);

  // Fetch events from the server
  const fetchEvents = async () => {
    try {
      const response = await axios.post("http://localhost:8000/events/find/", {
        username: localStorage.getItem("username"), // Pass the username in the request body
      });

      console.log(response.data);
      setEvents(response.data.events); // Assuming response.data.data contains the events
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const formattedEvents = events.map((event) => ({
    title: event.title,
    start: new Date(event.starts_at), // ensure these are in the right format
    end: new Date(event.ends_at), // ensure these are in the right format
    // You can add other properties as needed
  }));

  // Fetch events when component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // NEW: State to manage the modal //
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  // NEW: State to manage the modal //

  useEffect(() => {
    const handleResize = () => {
      if (calendarRef.current) {
        calendarRef.current.getApi().updateSize();
      }
    };

    // Trigger resize continuously during the transition
    let animationFrameId;
    const continuousResize = () => {
      handleResize();
      animationFrameId = requestAnimationFrame(continuousResize);
    };

    continuousResize(); // Start resizing
    return () => cancelAnimationFrame(animationFrameId); // Cleanup on unmount
  }, [open]);

  const handleDrawer = () => {
    setOpen((prevOpen) => {
      const newOpen = !prevOpen;
      localStorage.setItem("drawerOpen", newOpen); // Save new state to local storage
      return newOpen;
    });
  };

  // Change the view in FullCalendar based on the selection
  const handleSelectView = (value) => {
    setSelectedView(value);
    localStorage.setItem("calendarView", value); // Save the selected view to local storage
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(value);
      setHeaderTitle(calendarApi.view.title);
    }
  };

  // NEW: Function to handle "Prev" button click
  const handlePrev = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev();
      setHeaderTitle(calendarRef.current.getApi().view.title);
    }
  };

  // NEW: Function to handle "Next" button click
  const handleNext = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next();
      setHeaderTitle(calendarRef.current.getApi().view.title);
    }
  };

  // NEW: Function to handle "Today" button click
  const handleToday = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().today();
      setHeaderTitle(calendarRef.current.getApi().view.title);
    }
  };

  const handleViewDidMount = (info) => {
    setHeaderTitle(info.view.title);
  };

  const handleCheckboxChange = (event) => {
    setCategories({
      ...categories,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      {/* <SearchModal /> */}
      <NavigationBar
        open={open}
        handleDrawer={handleDrawer}
        handleToday={handleToday}
        handlePrev={handlePrev}
        handleNext={handleNext}
        headerTitle={headerTitle}
        selectedView={selectedView}
        handleSelectView={handleSelectView}
      />
      <CreateButton open={open} handleModalOpen={handleModalOpen} />
      <div>
        <Box display={"flex"}>
          <SideDrawer open={open} />
          <EventModal open={isModalOpen} handleClose={handleModalClose} />
          <Box
            height="calc(100vh - 64px)"
            width={"100%"}
            sx={{
              transition: "width 0.3s",
              overflow: "hidden",
            }}
          >
            <FullCalendar
              ref={calendarRef}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              initialView={selectedView}
              height="100%"
              selectable={true}
              dateClick={handleModalOpen}
              eventClick={handleModalOpen}
              headerToolbar={false}
              footerToolbar={false}
              events={formattedEvents}
              locale={"en-GB"}
              viewDidMount={handleViewDidMount}
              datesSet={(dateInfo) => setHeaderTitle(dateInfo.view.title)}
              eventDisplay="block"
            />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default TheCalendar;
