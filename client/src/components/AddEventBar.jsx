import React, { useState, useEffect } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrash,
  faTimes,
  faMapMarkerAlt,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

const AddEventBar = ({
  show,
  onHide,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  selectedEvent,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [category, setCategory] = useState("");
  const [recurrenceType, setRecurrenceType] = useState("");
  const [reminderType, setReminderType] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title || "");
      setDescription(selectedEvent.description || "");
      setMeetingLink(selectedEvent.meetingLink || "");
      setStartDateTime(
        selectedEvent.start
          ? moment(selectedEvent.start).format("YYYY-MM-DDTHH:mm")
          : ""
      );
      setEndDateTime(
        selectedEvent.end
          ? moment(selectedEvent.end).format("YYYY-MM-DDTHH:mm")
          : ""
      );
      setCategory(selectedEvent.category || "");
      setRecurrenceType(selectedEvent.recurrenceType || "");
      setReminderType(selectedEvent.reminderType || "");
      setLocation(selectedEvent.location || "");
    } else {
      setTitle("");
      setDescription("");
      setMeetingLink("");
      setStartDateTime("");
      setEndDateTime("");
      setCategory("");
      setRecurrenceType("");
      setReminderType("");
      setLocation("");
    }
  }, [selectedEvent]);

  const handleSubmit = () => {
    if (!startDateTime || !endDateTime) {
      alert("Please fill in all required fields.");
      return;
    }

    const start = moment(startDateTime).toDate();
    const end = moment(endDateTime).toDate();

    if (start >= end) {
      alert("End date/time must be after start date/time.");
      return;
    }

    const eventDetails = {
      title,
      description,
      meetingLink,
      start,
      end,
      category,
      recurrenceType,
      reminderType,
      location,
    };

    if (selectedEvent) {
      const updatedEvent = {
        ...selectedEvent,
        ...eventDetails,
      };
      onEditEvent(updatedEvent);
    } else {
      const newEvent = {
        id: Math.random(),
        ...eventDetails,
      };
      onAddEvent(newEvent);
    }
    onHide();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      if (selectedEvent) {
        onDeleteEvent(selectedEvent.id);
      }
    }
  };

  const getCurrentDateTimeLocal = () => {
    return moment().format("YYYY-MM-DDTHH:mm");
  };

  const getMinEndDateTime = () => {
    if (startDateTime) {
      return startDateTime;
    }
    return getCurrentDateTimeLocal();
  };

  return (
    <div className="relative">
      <div
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 z-50 bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl shadow-xl shadow-gray-700 ${
          show ? "block" : "hidden"
        }`}
        role="dialog"
        aria-labelledby="sidebar-title"
      >
        <div className="flex items-center justify-between">
          <h1 id="sidebar-title" className="text-4xl font-bold">
            {selectedEvent ? "Edit Event" : "Add Event"}
          </h1>

          <div className="flex items-center space-x-2">
            <button
              className="p-2 text-white bg-black rounded hover:bg-yellow-500"
              onClick={handleSubmit}
            >
              {selectedEvent ? (
                <FontAwesomeIcon icon={faPencilAlt} />
              ) : (
                "Submit"
              )}
            </button>
            {selectedEvent && (
              <button
                className="p-2 text-white bg-red-500 rounded hover:bg-red-900"
                onClick={handleDelete}
                aria-label="Delete Event"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
            <button
              className="p-2 text-white bg-red-500 rounded hover:bg-red-900"
              onClick={onHide}
              aria-label="Close Sidebar"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-2 sidebar-body">
          <label htmlFor="title" className="block mb-1 font-bold ">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Event Title"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-required="true"
          />

          <label htmlFor="description" className="block mb-1 font-bold">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Event Description"
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="startDateTime" className="block mb-1 font-bold">
                Start Date
              </label>
              <input
                id="startDateTime"
                type="datetime-local"
                className="w-full p-2 border border-gray-300 rounded"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                aria-required="true"
                min={getCurrentDateTimeLocal()}
              />
            </div>

            <div className="flex-1">
              <label htmlFor="endDateTime" className="block mb-1 font-bold">
                End Date
              </label>
              <input
                id="endDateTime"
                type="datetime-local"
                className="w-full p-2 border border-gray-300 rounded"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                aria-required="true"
                min={getMinEndDateTime()}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="meetingLink"
                className="flex items-center block mb-1 space-x-1 font-bold"
              >
                <FontAwesomeIcon icon={faLink} />
                <span>Meeting Link</span>
              </label>
              <input
                id="meetingLink"
                type="url"
                placeholder="Meeting Link"
                className="w-full p-2 border border-gray-300 rounded"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="location"
                className="flex items-center block mb-1 space-x-1 font-bold"
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>Location</span>
              </label>
              <input
                id="location"
                type="text"
                placeholder="Location"
                className="w-full p-2 border border-gray-300 rounded"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="category" className="block mb-1 font-bold">
                Category
              </label>
              <select
                id="category"
                className="w-full p-2 border border-gray-300 rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Personal">Personal</option>
                <option value="Branch">Branch</option>
                <option value="Bank">Bank</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="recurrenceType" className="block mb-1 font-bold">
                Recurrence
              </label>
              <select
                id="recurrenceType"
                className="w-full p-2 border border-gray-300 rounded"
                value={recurrenceType}
                onChange={(e) => setRecurrenceType(e.target.value)}
              >
                <option value="Non-recurring">Non-recurring</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="reminderType" className="block mb-1 font-bold">
                Reminder
              </label>
              <select
                id="reminderType"
                className="w-full p-2 border border-gray-300 rounded"
                value={reminderType}
                onChange={(e) => setReminderType(e.target.value)}
              >
                <option value="No reminder">No reminder</option>
                <option value="15 minutes">15 minutes</option>
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="1 day">1 day</option>
                <option value="1 week">1 week</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventBar;
