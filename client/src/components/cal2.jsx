import React, { createRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // main calendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // plugin for day grid view
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import AddEventBar from "./AddEventBar"; // component to add events
import axios from "axios";

const Cal = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedView, setSelectedView] = useState("dayGridMonth");

  const calendarRef = createRef();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/events/viewevent"
      );

      const transformedEvents = response.data.existingEvents.map((event) => ({
        title: event.title,
        start: event.starts_at,
        end: event.ends_at,
        id: event._id,
        extendedProps: {
          category: event.category,
          recurrence: event.recurrence,
          meeting_link: event.meeting_link,
          description: event.description,
          location: event.location,
        },

        color: event.category === "Personal" ? "#ff9f40" : "#3788d8",
      }));

      setEvents(transformedEvents);
      console.log(transformedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    // Fetch events from the backend when the component mounts
    fetchEvents();
  }, []);

  // Function to handle adding a new event
  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const handleAddEvent = async (newEvent) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/events/addevent",
        newEvent
      );
      setEvents([...events, response.data]);
      console.log(setEvents);
      setShowOffcanvas(false);
    } catch (error) {
      console.log("Error adding event:", error);
    }
  };

  const handleEditEvent = async (updatedEvent) => {
    try {
      await axios.put(
        `http://localhost:8000/api/events/updateevent/${updatedEvent._id}`, // Use template literal correctly
        updatedEvent
      );

      // Update the local events state with the updated event
      setEvents(
        events.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
      console.log(setEvents);

      setShowOffcanvas(false);
    } catch (error) {
      console.log("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:8000/events/deleteevent/${id}`);
        setEvents(events.filter((event) => event._id !== id));
        console.log(setEvents);
        setShowOffcanvas(false);
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.event); // `event.event` is needed for FullCalendar
    toggleOffcanvas();
  };

  const handleSelectView = (view) => {
    setSelectedView(view); // Update the selected view state
    const calendar = calendarRef.current;
    if (calendar) {
      const calendarApi = calendar.getApi();
      calendarApi.changeView(view); // Change the view programmatically
    }
  };

  return (
    <div>
      <button onClick={() => setShowOffcanvas(true)}>Add Event</button>
      <AddEventBar
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        onAddEvent={handleAddEvent}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
        selectedEvent={selectedEvent}
      />
      <div className="mb-4">
        <label htmlFor="viewSelect" className="sr-only">
          Select View
        </label>{" "}
        {/* Accessible label for screen readers */}
        <select
          id="viewSelect"
          name="viewSelect" // Add a name attribute
          className="px-2 py-1 border rounded"
          value={selectedView}
          onChange={(e) => handleSelectView(e.target.value)}
        >
          <option value="timeGridDay">Day</option>
          <option value="timeGridWeek">Week</option>
          <option value="dayGridMonth">Month</option>
          <option value="multiMonthYear">Year</option>
        </select>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, multiMonthPlugin]}
        initialView={selectedView}
        events={events}
        eventClick={handleSelectEvent}
        headerToolbar={false}
        eventColor="#ff9f40"
      />
    </div>
  );
};

export default Cal;
