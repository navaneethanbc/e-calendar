// import React, { createRef, useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import multiMonthPlugin from "@fullcalendar/multimonth";
// import AddFunc from "../components/CalendarFunction/AddEvent";
// import EditFunc from "../components/CalendarFunction/EditEvent";
// import axios from "axios";
// import Sidebar from "../components/CalendarFunction/Sidebar";
// import { debounce } from "lodash";

// const CalendarView = () => {
//   const [showAddOffcanvas, setShowAddOffcanvas] = useState(false);
//   const [showEditOffcanvas, setShowEditOffcanvas] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState({
//     Personal: true,
//     Branch: true,
//     Bank: true,
//   });
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [selectedView, setSelectedView] = useState("dayGridMonth");
//   const [dayPicker, setDayPicker] = useState(null);

//   const calendarRef = createRef();

//   const toggleAddOffcanvas = () => {
//     setShowAddOffcanvas(!showAddOffcanvas);
//   };

//   const handleAddEvent = async (newEvent) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/events/addevent",
//         newEvent
//       );
//       const updatedEvents = [...events, response.data];
//       setEvents(updatedEvents);
//       filterEventsByCategory(updatedEvents);
//       setShowAddOffcanvas(false); // Close AddEventBaradd after event is added
//     } catch (error) {
//       console.log("Error adding event:", error);
//     }
//   };

//   const handleEditEvent = async (updatedEvent) => {
//     try {
//       await axios.put(
//         `http://localhost:8000/api/events/updateevent/${updatedEvent.id}`,
//         updatedEvent
//       );
//       const updatedEvents = events.map((event) =>
//         event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
//       );
//       setEvents(updatedEvents);
//       filterEventsByCategory(updatedEvents); // Update filtered events after editing
//       setShowEditOffcanvas(false);
//     } catch (error) {
//       console.log("Error updating event:", error);
//     }
//   };

//   const handleDeleteEvent = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/events/deleteevent/${id}`);
//       const updatedEvents = events.filter((event) => event.id !== id);
//       setEvents(updatedEvents);
//       filterEventsByCategory(updatedEvents); // Update filtered events after deletion
//       setShowEditOffcanvas(false);
//     } catch (error) {
//       console.error("Error deleting event:", error);
//     }
//   };

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/events/viewevent"
//       );

//       const transformedEvents = response.data.existingEvents.map((event) => ({
//         title: event.title,
//         start: event.starts_at,
//         end: event.ends_at,
//         id: event._id,
//         extendedProps: {
//           category: event.category,
//           meeting_link: event.meeting_link,
//           description: event.description,
//           location: event.location,
//           reminder: event.reminder,
//           reccurence: event.reccurence,
//         },
//         color:
//           event.category === "Personal"
//             ? "green"
//             : event.category === "Bank"
//             ? "red"
//             : event.category === "Branch"
//             ? "blue"
//             : "#3788d8",
//       }));

//       setEvents(transformedEvents);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   const filterEventsByCategory = (allEvents) => {
//     const filtered = allEvents.filter(
//       (event) => selectedCategories[event.extendedProps.category]
//     );
//     setFilteredEvents(filtered);
//   };

//   // Create a debounced version of filterEventsByCategory
//   const debouncedFilterEventsByCategory = debounce(filterEventsByCategory, 300);

//   useEffect(() => {
//     fetchEvents();
//   }, [events]);

//   useEffect(() => {
//     debouncedFilterEventsByCategory(events);
//   }, [selectedCategories, events]);

//   const handleSelectEvent = (event) => {
//     const selectedEventData = event.event.extendedProps;
//     setSelectedEvent(event.event); // Set the selected event
//     setShowEditOffcanvas(true);
//   };

//   const handleSelectView = (view) => {
//     setSelectedView(view); // Update the selected view state
//     const calendar = calendarRef.current;
//     if (calendar) {
//       const calendarApi = calendar.getApi();
//       calendarApi.changeView(view);
//     }
//   };

//   const handleDayPicker = (date) => {
//     setDayPicker(date); // Set the selected date for DayPicker

//     const calendar = calendarRef.current;
//     if (calendar && date) {
//       const calendarApi = calendar.getApi();
//       calendarApi.gotoDate(date);
//     }
//   };

//   const handleCategoryChange = (category, isChecked) => {
//     setSelectedCategories((prev) => ({ ...prev, [category]: isChecked }));
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className="flex justify-end p-4">
//         <label htmlFor="viewSelect" className="sr-only">
//           Select View
//         </label>
//         <select
//           id="viewSelect"
//           name="viewSelect"
//           className="px-2 py-1 border rounded"
//           value={selectedView}
//           onChange={(e) => handleSelectView(e.target.value)}
//         >
//           <option value="timeGridDay">Day</option>
//           <option value="timeGridWeek">Week</option>
//           <option value="dayGridMonth">Month</option>
//           <option value="multiMonthYear">Year</option>
//         </select>
//       </div>

//       <div className="flex flex-1 ">
//         <div className="w-1/4 p-4">
//           <Sidebar
//             eventFcn={() => {
//               setSelectedEvent(null);
//               toggleAddOffcanvas();
//             }}
//             selected={dayPicker}
//             onSelect={handleDayPicker}
//             onCategoryChange={handleCategoryChange}
//           />
//         </div>
//         <div className="flex-1 h-full p-4 overflow-auto max-h-[calc(100vh-80px)]">
//           <FullCalendar
//             ref={calendarRef}
//             plugins={[dayGridPlugin, timeGridPlugin, multiMonthPlugin]}
//             initialView={selectedView}
//             events={filteredEvents} // Use filteredEvents for display
//             eventClick={handleSelectEvent}
//             headerToolbar={{
//               right: "today,prev,next",
//               center: "title",
//               left: false,
//             }}
//             eventColor="#ff9f40"
//             height="100%"
//             contentHeight="auto"
//           />
//         </div>
//       </div>

//       <AddFunc
//         show={showAddOffcanvas}
//         onHide={() => setShowAddOffcanvas(false)}
//         onAddEvent={handleAddEvent}
//       />
//       <EditFunc
//         show={showEditOffcanvas}
//         onHide={() => setShowEditOffcanvas(false)}
//         onEditEvent={handleEditEvent}
//         selectedEvent={selectedEvent}
//         setSelectedEvent={setSelectedEvent}
//         onDeleteEvent={handleDeleteEvent}
//       />
//     </div>
//   );
// };

// export default CalendarView;
