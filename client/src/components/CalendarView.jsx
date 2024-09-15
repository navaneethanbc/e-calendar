import React, { createRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // main calendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // plugin for day grid view
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import AddFunc from "./CalendarFunction/AddEvent";
import EditFunc from "./CalendarFunction/EditEvent";
import axios from "axios";
import Sidebar from "./CalendarFunction/Sidebar";

const CalendarView = () => {
  const [showAddOffcanvas, setShowAddOffcanvas] = useState(false);
  const [showEditOffcanvas, setShowEditOffcanvas] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedView, setSelectedView] = useState("dayGridMonth");

  const calendarRef = createRef();

  // Function to handle adding a new event
  const toggleAddOffcanvas = () => {
    setShowAddOffcanvas(!showAddOffcanvas);
  };

  const handleAddEvent = async (newEvent) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/events/addevent",
        newEvent
      );
      setEvents([...events, response.data]);
      setShowAddOffcanvas(false); // Close AddEventBaradd after event is added
    } catch (error) {
      console.log("Error adding event:", error);
    }
  };

  const handleEditEvent = async (updatedEvent) => {
    try {
      await axios.put(
        `http://localhost:8000/api/events/updateevent/${updatedEvent.id}`,
        updatedEvent
      );
      setEvents(
        events.map((event) =>
          event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
        )
      );

      setShowEditOffcanvas(false);
    } catch (error) {
      console.log("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(
          `http://localhost:8000/api/events/deleteevent/${id}`
        );
        setEvents(events.filter((event) => event._id !== id));
        setShowEditOffcanvas(false);
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

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
          meeting_link: event.meeting_link,
          description: event.description,
          location: event.location,
          reminder: event.reminder,
          reccurence: event.reccurence,
        },
        color:
          event.category === "Personal"
            ? "green"
            : event.category === "Bank"
            ? "red"
            : event.category === "Branch"
            ? "blue"
            : "#3788d8",
      }));

      setEvents(transformedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [handleAddEvent, handleDeleteEvent]);

  const handleSelectEvent = (event) => {
    const selectedEventData = event.event.extendedProps;
    setSelectedEvent(event.event); // Set the selected event
    setShowEditOffcanvas(true);
  };

  const handleSelectView = (view) => {
    setSelectedView(view); // Update the selected view state
    const calendar = calendarRef.current;
    if (calendar) {
      const calendarApi = calendar.getApi();
      calendarApi.changeView(view);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-end p-4">
        <label htmlFor="viewSelect" className="sr-only">
          Select View
        </label>
        <select
          id="viewSelect"
          name="viewSelect"
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

      <div className="flex flex-1">
        <div className="w-1/4 p-4">
          <Sidebar
            setView={handleSelectView}
            ViewsDAY="timeGridDay"
            ViewsWEEK="timeGridWeek"
            ViewsMONTH="dayGridMonth"
            ViewsYEAR="multiMonthYear"
            eventFcn={() => {
              setSelectedEvent(null);
              toggleAddOffcanvas();
            }}
          />
        </div>

        <div className="flex-1 h-full p-4">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, multiMonthPlugin]}
            initialView={selectedView}
            events={events}
            eventClick={handleSelectEvent}
            headerToolbar={{
              right: "today,prev,next",
              center: "title",
              left: false,
            }}
            eventColor="#ff9f40"
            height="100%"
            contentHeight="auto"
          />
        </div>
      </div>

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
  );
};

export default CalendarView;
