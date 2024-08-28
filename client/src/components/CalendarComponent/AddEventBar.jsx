import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import moment from "moment";

const Sidebar = ({
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
  const [isGuest, setIsGuest] = useState(false);

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
      setIsGuest(selectedEvent.isGuest || false);
    } else {
      setTitle("");
      setDescription("");
      setMeetingLink("");
      setStartDateTime("");
      setEndDateTime("");
      setCategory("");
      setRecurrenceType("");
      setReminderType("");
      setIsGuest(false);
    }
  }, [selectedEvent]);

  const handleSubmit = () => {
    if (!title || !startDateTime || !endDateTime) {
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
      isGuest,
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
    <div
      className={`sidebar ${show ? "show" : ""}`}
      role="dialog"
      aria-labelledby="sidebar-title"
    >
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h3 id="sidebar-title">
            {selectedEvent ? "Edit Event" : "Add Event"}
          </h3>
          <button
            className="close-btn"
            onClick={onHide}
            aria-label="Close Sidebar"
          >
            Close
          </button>
        </div>
        <div className="sidebar-body">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-required="true"
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="meetingLink">Meeting Link</label>
          <input
            id="meetingLink"
            type="url"
            placeholder="Meeting Link"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
          />

          <label htmlFor="startDateTime">Start Date & Time</label>
          <input
            id="startDateTime"
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            aria-required="true"
            min={getCurrentDateTimeLocal()}
          />

          <label htmlFor="endDateTime">End Date & Time</label>
          <input
            id="endDateTime"
            type="datetime-local"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            aria-required="true"
            min={getMinEndDateTime()}
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Personal">Personal</option>
            <option value="Branch">Branch</option>
            <option value="Organization">Organization</option>
          </select>

          <label htmlFor="recurrenceType">Recurrence Type</label>
          <select
            id="recurrenceType"
            value={recurrenceType}
            onChange={(e) => setRecurrenceType(e.target.value)}
          >
            <option value="Non-recurring">Non-recurring</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Annually">Annually</option>
          </select>

          <label htmlFor="reminderType">Reminder Type</label>
          <select
            id="reminderType"
            value={reminderType}
            onChange={(e) => setReminderType(e.target.value)}
          >
            <option value="None">None</option>
            <option value="10 minutes before">10 minutes before</option>
            <option value="30 minutes before">30 minutes before</option>
            <option value="1 hour before">1 hour before</option>
            <option value="1 day before">1 day before</option>
          </select>

          <label htmlFor="isGuest">Invite Guests?</label>
          <input
            id="isGuest"
            type="checkbox"
            checked={isGuest}
            onChange={(e) => setIsGuest(e.target.checked)}
          />

          <br />

          <button className="btn btn-primary" onClick={handleSubmit}>
            {selectedEvent ? "Update" : "Submit"}
          </button>

          {selectedEvent && (
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
