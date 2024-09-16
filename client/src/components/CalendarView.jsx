import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import AddEventBar from "./CalendarComponent/AddEventBar";
import Event from "./CalendarComponent/Event";
import SearchBar from "./CalendarComponent/SearchBar";
import Sidebar from "./CalendarComponent/Sidebar";


import SearchAvailable from "./CalendarComponent/SearchAvailable";

const localizer = momentLocalizer(moment);

function CalendarView() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [recurrenceType, setRecurrenceType] = useState("");
  const [reminderType, setReminderType] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [view, setView] = useState(Views.MONTH);

  // const [searchresult,setSearchResult]= useState({})
  const [notifications,setNotifications] = useState([])

  const handleSubmit =(e)=>{
    e.preventDefault()
    console.log("mmok")

  }

  useEffect(() => {
    handleSearch();
  }, [
    events,
    searchQuery,
    startDate,
    endDate,
    category,
    recurrenceType,
    reminderType,
  ]);

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowOffcanvas(false);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setShowOffcanvas(false);
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== id));
      setShowOffcanvas(false);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    toggleOffcanvas();
  };

  const handleSearch = () => {
    const filtered = events.filter((event) => {
      const eventStartDate = moment(event.start).format("YYYY-MM-DD");
      const isWithinDateRange =
        (!startDate || eventStartDate >= startDate) &&
        (!endDate || eventStartDate <= endDate);

      return (
        isWithinDateRange &&
        (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (event.description &&
            event.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))) &&
        (category === "" || event.category === category) &&
        (recurrenceType === "" || event.recurrenceType === recurrenceType) &&
        (reminderType === "" || event.reminderType === reminderType)
      );
    });

    setFilteredEvents(filtered);
  };

  const getEventStyle = (event) => {
    const eventCount = events.filter((e) =>
      moment(e.start).isSame(event.start, "day")
    ).length;

    const height = 100 / eventCount;
    return {
      backgroundColor: "#F6C839",
      height: `${height}%`,
      borderLeft: `5px solid #F6C839`,
    };
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full p-4">
        <SearchAvailable 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          category={category}
          setCategory={setCategory}
          handleSubmit={handleSubmit}
          notifications={notifications} />
        {/* <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          category={category}
          setCategory={setCategory}
          recurrenceType={recurrenceType}
          setRecurrenceType={setRecurrenceType}
          reminderType={reminderType}
          setReminderType={setReminderType}
          onSearch={handleSearch}
        /> */}
      </div>
      <div className="flex flex-grow">
        <div className="w-full p-4 md:w-1/4">
          <Sidebar
            setView={setView}
            ViewsDAY={Views.DAY}
            ViewsWEEK={Views.WEEK}
            ViewsMONTH={Views.MONTH}
            eventFcn={() => {
              setSelectedEvent(null);
              toggleOffcanvas();
            }}
          />
        </div>
        <div className="w-full p-4 md:w-3/4">
          <AddEventBar
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
            selectedEvent={selectedEvent}
          />
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            style={{
              height: "calc(100vh - 64px)",
              margin: "0 auto",
              textAlign: "center",
            }}
            onSelectEvent={handleSelectEvent}
            components={{
              event: Event,
            }}
            eventPropGetter={(event) => ({
              style: getEventStyle(event),
            })}
            view={view}
            onView={(newView) => setView(newView)}
          />
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
