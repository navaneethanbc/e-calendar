import React, { createRef, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // main calendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // plugin for day grid view
import AddEventBar from "./AddEventBar"; // component to add events
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
const Cal = () => {
  const [events, setEvents] = useState([]); // state to hold the list of events

  // Function to handle adding a new event
  const handleAddEvent = (event) => {
    setEvents([...events, event]);
  };

  const calendarRef = createRef();

  return (
    <div>
      <AddEventBar onAddEvent={handleAddEvent} /> {/* Event input component */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, multiMonthPlugin]}
        initialView="dayGridMonth"
        events={events} // pass events to the calendar
        customButtons={{
          myTimeDayBtn: {
            text: "timeDay",
            click() {
              const calendar = calendarRef.current;
              if (calendar) {
                const calendarApi = calendar.getApi();
                calendarApi.changeView("timeGridDay");
              }
            },
          },
          myTimeWeekBtn: {
            text: "timeWeek",
            click() {
              const calendar = calendarRef.current;
              if (calendar) {
                const calendarApi = calendar.getApi();
                calendarApi.changeView("timeGridWeek");
              }
            },
          },
        }}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right:
            "today,dayGridDay,dayGridWeek,dayGridMonth,multiMonthYear,timeGridWeek,myTimeDayBtn,myTimeWeekBtn",
        }}
      />
    </div>
  );
};

export default Cal;
