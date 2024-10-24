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
import ShowSearchResult from "../components/EventsAndAvailability/ShowSearchResult";
import SideDrawer from "../components/CalendarFunction/SideDrawer";

import NavigationBar from "../components/NavigationBar";
import { CreateButton } from "../components/CreateButton";
import { Box } from "@mui/material";

const CalendarView = () => {
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [showEditEventForm, setShowEditEventForm] = useState(false);
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

  const [searchOpen, setSearchOpen] = useState(false); // state to decide showing the search bar or not
  const [resultEvents, setResultEvents] = useState({}); // to store events got from the backend by search
  const [resultAvailable, setResultAvailble] = useState({}); // to store  availabilitty got from backend
  const [showCalendar, setShowCalendar] = useState(true); // to decide calendar or events to show
  const [showAvailable, setShowAvailable] = useState(false); // switch between calendar and show events
  // to store search event states
  const [searchevent, setSearchEvent] = useState({
    username: "",
    title: "",
    from: "",
    to: "",
    category: "",
  });
  // to store search availability search
  const [searchAvailable, setSearchAvailable] = useState({
    username: "",
    fromDate: "",
    toDate: "",
  });

  const calendarRef = useRef(null);

  const toggleForm = () => {
    setShowAddEventForm(!showAddEventForm);
  };

  const handleAddEvent = async (newEvent) => {
    try {
      // console.log("Adding new event:", newEvent);

      const response = await axios.post(
        "https://e-calendar-cocq.vercel.app/events/create",
        newEvent
      );
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
    } catch (error) {
      console.log("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async (id, type) => {
    try {
      await axios.delete(`https://e-calendar-cocq.vercel.app/events/${id}`, {
        params: { type },
      });
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
            ? "#d4a5a5"
            : event.category === "Bank"
            ? "#b0c4b1"
            : "#769fcd",
      }));

      setEvents(transformedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // const filterEventsByCategory = (allEvents) => {
  //   const filtered = allEvents.filter(
  //     (event) => selectedCategories[event.extendedProps.category]
  //   );
  //   setFilteredEvents(filtered);
  // };

  const filterEventsByCategory = (allEvents) => {
    // Add a safety check for extendedProps and category
    const filtered = allEvents.filter(
      (event) =>
        event.extendedProps &&
        event.extendedProps.category &&
        selectedCategories[event.extendedProps.category]
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
    setShowEditEventForm(true);
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
        handleDrawer={handleDrawer}
        handleToday={handleToday}
        handlePrev={handlePrev}
        handleNext={handleNext}
        headerTitle={headerTitle}
        selectedView={selectedView}
        handleSelectView={handleSelectView}
        setResultEvents={setResultEvents}
        setShowCalendar={setShowCalendar}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchevent={searchevent}
        setSearchEvent={setSearchEvent}
        setResultAvailble={setResultAvailble}
        setShowAvailable={setShowAvailable}
        searchAvailable={searchAvailable}
        setSearchAvailable={setSearchAvailable}
      />
      <CreateButton
        open={open}
        handleModalOpen={() => {
          setSelectedEvent(null);
          toggleForm();
        }}
      />
      <div>
        <Box display={"flex"}>
          <SideDrawer
            open={open}
            dayPicker={dayPicker}
            handleDayPicker={handleDayPicker}
            handleCategoryChange={handleCategoryChange}
            handleSelectView={handleSelectView}
            select={selectedView}
            setOpen={setOpen}
          />

          <Box
            height={{ sm: "91.6vh", xs: "92.6vh" }}
            width={!open ? "100vw" : { sm: "100vw", xs: 0 }}
            // display={!open ? "block" : { sm: "block", xs: "none" }}
            sx={{
              transition: "width 0.3s",
              overflow: "hidden",
            }}
          >
            {showCalendar ? (
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
                  toggleForm();
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
                fixedWeekCount={false}
                dayMaxEventRows={true}
              />
            ) : (
              <ShowSearchResult
                resultEvents={resultEvents}
                resultAvailable={resultAvailable}
                setShowCalendar={setShowCalendar}
                setSearchOpen={setSearchOpen}
                setSearchEvent={setSearchEvent}
                setSearchAvailable={setSearchAvailable}
                showAvailable={showAvailable}
                setShowAvailable={setShowAvailable}
                searchAvailable={searchAvailable}
              />
            )}
          </Box>
        </Box>
        <AddFunc
          showForm={showAddEventForm}
          hideForm={() => setShowAddEventForm(false)}
          handleAddEvent={handleAddEvent}
        />
        <EditFunc
          showForm={showEditEventForm}
          hideForm={() => setShowEditEventForm(false)}
          handleEditEvent={handleEditEvent}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      </div>
    </>
  );
};

export default CalendarView;
