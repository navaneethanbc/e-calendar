import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import AddFunc from "../components/CalendarFunction/AddEvent";
import EditFunc from "../components/CalendarFunction/EditEvent";
import axios from "axios";
import { debounce } from "lodash";
import ShowEvents from "../components/CalendarFunction/ShowEvents";
import SideDrawer from "../components/CalendarFunction/SideDrawer";

import NavigationBar from "../components/NavigationBar";
import { CreateButton } from "../components/CreateButton";
import { Box } from "@mui/material";

const CalendarView = () => {
  const [showAddOffcanvas, setShowAddOffcanvas] = useState(false);
  const [showEditOffcanvas, setShowEditOffcanvas] = useState(false);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({
    Personal: true,
    Branch: true,
    Bank: true,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(() => {
    return localStorage.getItem("drawerOpen") === "true"; // Restore drawer state from local storage
  });
  const [selectedView, setSelectedView] = useState(
    () => localStorage.getItem("calendarView") || "dayGridMonth"
  );
  const [headerTitle, setHeaderTitle] = useState("");
  const [dayPicker, setDayPicker] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [searchResult, setSearchResult] = useState(events);
  const [notifications, setNotifications] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const calendarRef = useRef(null);

  const toggleAddOffcanvas = () => {
    setShowAddOffcanvas(!showAddOffcanvas);
  };

  const handleAddEvent = async (newEvent) => {
    try {
      console.log("Adding new event:", newEvent);

      const response = await axios.post(
        "https://e-calendar-cocq.vercel.app/events/create",
        newEvent
      );

      const updatedEvents = [...events, response.data];
      setEvents(updatedEvents);
      filterEventsByCategory(updatedEvents);
      setShowAddOffcanvas(false); // Close AddEventBar after event is added
    } catch (error) {
      console.log("Error adding event:", error);
    }
  };

  const handleEditEvent = async (updatedEvent) => {
    try {
      await axios.put(
        `https://e-calendar-cocq.vercel.app/events/${updatedEvent.id}`,
        updatedEvent
      );
      const updatedEvents = events.map((event) =>
        event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
      );
      setEvents(updatedEvents);
      filterEventsByCategory(updatedEvents); // Update filtered events after editing
      setShowEditOffcanvas(false);
    } catch (error) {
      console.log("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`https://e-calendar-cocq.vercel.app/events/${id}`);
      const updatedEvents = events.filter((event) => event.id !== id);
      setEvents(updatedEvents);
      filterEventsByCategory(updatedEvents); // Update filtered events after deletion
      setShowEditOffcanvas(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.post(
        "https://e-calendar-cocq.vercel.app/events/find/",
        {
          username: localStorage.getItem("username"),
        }
      );

      const transformedEvents = response.data.events.map((event) => ({
        title: event.title,
        start: event.starts_at,
        end: event.ends_at,
        id: event._id,
        extendedProps: {
          category: event.category,
          meeting_link: event.meeting_link,
          description: event.description,
          location: event.location,
          reminder: event.reminder,
          recurrence: event.recurrence,
          guests: event.guests,
          owner: event.owner,
        },
        color:
          event.category === "Personal"
            ? "#b8860b"
            : event.category === "Bank"
            ? "red"
            : "#00008b",
      }));

      setEvents(transformedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const filterEventsByCategory = (allEvents) => {
    const filtered = allEvents.filter(
      (event) => selectedCategories[event.extendedProps.category]
    );
    setFilteredEvents(filtered);
  };

  const debouncedFilterEventsByCategory = debounce(filterEventsByCategory, 300);

  useEffect(() => {
    fetchEvents();
  }, [events]);

  useEffect(() => {
    debouncedFilterEventsByCategory(events);
  }, [selectedCategories, events]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.event); // Set the selected event
    setShowEditOffcanvas(true);
  };

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

  const handleSelectView = (value) => {
    setSelectedView(value);
    localStorage.setItem("calendarView", value); // Save the selected view to local storage
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(value);
      setHeaderTitle(calendarApi.view.title);
    }
  };

  const handleDayPicker = (date) => {
    setDayPicker(date); // Set the selected date for DayPicker

    const calendar = calendarRef.current;
    if (calendar && date) {
      const calendarApi = calendar.getApi();
      calendarApi.gotoDate(date);
    }
  };

  const handleCategoryChange = (category, isChecked) => {
    setSelectedCategories((prev) => ({ ...prev, [category]: isChecked }));
  };

  //Navigation bar component handle

  const handleDrawer = () => {
    setOpen((prevOpen) => {
      const newOpen = !prevOpen;
      localStorage.setItem("drawerOpen", newOpen); // Save new state to local storage
      return newOpen;
    });
  };
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

  return (
    <>
      <NavigationBar
        open={open}
        handleDrawer={handleDrawer}
        handleToday={handleToday}
        handlePrev={handlePrev}
        handleNext={handleNext}
        headerTitle={headerTitle}
        selectedView={selectedView}
        handleSelectView={handleSelectView}
        notifications={notifications}
      />
      <CreateButton
        open={open}
        handleModalOpen={() => {
          setSelectedEvent(null);
          toggleAddOffcanvas();
        }}
      />
      <div>
        <Box display={"flex"}>
          <SideDrawer
            open={open}
            eventFcn={() => {
              setSelectedEvent(null);
              toggleAddOffcanvas();
            }}
            selected={dayPicker}
            onSelect={handleDayPicker}
            onCategoryChange={handleCategoryChange}
            handleSelectView={handleSelectView}
            select={selectedView}
          />

          <Box
            height="calc(100vh - 64px)"
            width={"100%"}
            sx={{
              transition: "width 0.3s",
              overflow: "hidden",
              "@media (max-width: 600px)": {
                width: open ? "0%" : "100%",
                display: open ? "none" : "block",
              },
            }}
          >
            {!showSearch ? (
              <FullCalendar
                ref={calendarRef}
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                initialView={selectedView}
                events={filteredEvents}
                selectable={true}
                dateClick={() => {
                  setSelectedEvent();
                  toggleAddOffcanvas();
                }}
                eventClick={handleSelectEvent}
                headerToolbar={false}
                footerToolbar={false}
                locale={"en-GB"}
                viewDidMount={handleViewDidMount}
                datesSet={(dateInfo) => setHeaderTitle(dateInfo.view.title)}
                eventDisplay="block"
                height="100%"
                eventContent={(eventInfo) => (
                  <div className="cursor-pointer">{eventInfo.event.title}</div>
                )}
              />
            ) : (
              <ShowEvents searchResult={searchResult} />
            )}
          </Box>
        </Box>
        <AddFunc
          show={showAddOffcanvas}
          onHide={() => setShowAddOffcanvas(false)}
          onAddEvent={handleAddEvent}
        />
        <EditFunc
          show={showEditOffcanvas}
          onHide={() => setShowEditOffcanvas(false)}
          onEditEvent={handleEditEvent}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      </div>
    </>
  );
};

export default CalendarView;
