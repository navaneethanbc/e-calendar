import React, { createRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import AddFunc from "../components/CalendarFunction/AddEvent";
import EditFunc from "../components/CalendarFunction/EditEvent";
import axios from "axios";
import Sidebar from "../components/CalendarFunction/Sidebar";
import { debounce } from "lodash";
import SearchAvailable from "../components/CalendarFunction/SearchAvailable";
import ShowEvents from "../components/CalendarFunction/ShowEvents";

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
  const [selectedView, setSelectedView] = useState("dayGridMonth");
  const [dayPicker, setDayPicker] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [searchResult, setSearchResult] = useState(events);
  const [notifications, setNotifications] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const calendarRef = createRef();

  const toggleAddOffcanvas = () => {
    setShowAddOffcanvas(!showAddOffcanvas);
  };

  const handleAddEvent = async (newEvent) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/events/addevent",
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
        `http://localhost:8000/api/events/updateevent/${updatedEvent.id}`,
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
      await axios.delete(`http://localhost:8000/api/events/deleteevent/${id}`);
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
            ? "#b8860b"
            : event.category === "Bank"
            ? "red"
            : event.category === "Branch"
            ? "#00008b"
            : "#3788d8",
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
    // to get date as  mm/dd/yyyy
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    //to filter the events according to  search title
    const filterTitle = events.filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // to filter the events according to search category
    const filterCategory = filterTitle.filter((event) =>
      event.extendedProps.category
        .toLowerCase()
        .includes(category.toLowerCase())
    );

    //if start date exist then filter otherwise skip the filtering
    const filterStart = startDate
      ? filterCategory.filter(
          (event) =>
            formatter.format(new Date(event.start)) ==
            formatter.format(new Date(startDate))
        )
      : filterCategory;
    //if end date exist then filter otherwise skip the filtering
    const filterEnd = endDate
      ? filterStart.filter(
          (event) =>
            formatter.format(new Date(event.end)) ==
            formatter.format(new Date(endDate))
        )
      : filterStart;

    setSearchResult(filterEnd); // update search result array according to  searches
  }, [searchQuery, startDate, endDate, category]);

  const handleSelectView = (view) => {
    setSelectedView(view); // Update the selected view state
    const calendar = calendarRef.current;
    if (calendar) {
      const calendarApi = calendar.getApi();
      calendarApi.changeView(view);
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

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[365px] min-w-[365px]">
        <Sidebar
          eventFcn={() => {
            setSelectedEvent(null);
            toggleAddOffcanvas();
          }}
          selected={dayPicker}
          onSelect={handleDayPicker}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="flex flex-col flex-1 p-0 mr-4 overflow-x-hidden">
        <div className="flex">
          <SearchAvailable // search bar, availability checker, notification
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            category={category}
            setCategory={setCategory}
            notifications={notifications}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            selectedView={selectedView}
            handleSelectView={(e) => handleSelectView(e.target.value)}
          />
        </div>

        {!showSearch ? (
          <div className="flex-1 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-80px)]">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, multiMonthPlugin]}
              initialView={selectedView}
              events={filteredEvents}
              eventClick={handleSelectEvent}
              headerToolbar={{
                right: "today,prev,next",
                center: "title",
                left: false,
              }}
              eventColor="#ff9f40"
              eventDisplay="block"
              height="100%"
            />
          </div>
        ) : (
          <ShowEvents searchResult={searchResult} />
        )}
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
