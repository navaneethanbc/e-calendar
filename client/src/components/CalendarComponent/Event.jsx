import React from "react";

const Event = ({ event }) => (
  <div
    className={`p-2 rounded-md text-white overflow-hidden flex flex-col justify-center hover:bg-gray-800 cursor-pointer`}
    style={{ height: `${event.height}px`, position: "relative" }}
  >
    <div className="mb-1 font-bold">
      <strong>{event.title}</strong>
    </div>
    <div className="text-xs">
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
