import React from "react";
import "./Event.css";

const Event = ({ event }) => (
  <div
    className="event-container"
    style={{ height: `${event.height}px`, position: "relative" }}
  >
    <div className="event-title">
      <strong>{event.title}</strong>
    </div>
    <div className="event-details">
      <p>{event.description}</p>
      {event.meetingLink && (
        <p>
          Zoom Link:{" "}
          <a href={event.meetingLink} target="_blank" rel="noopener noreferrer">
            Join Meeting
          </a>
        </p>
      )}
      <p>
        <strong>Category:</strong> {event.category}
      </p>
      <p>
        <strong>Recurrence:</strong> {event.recurrenceType}
      </p>
      <p>
        <strong>Guests Invited:</strong> {event.isGuest ? "Yes" : "No"}
      </p>
    </div>
  </div>
);

export default Event;
