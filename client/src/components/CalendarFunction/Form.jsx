import React from "react";
import moment from "moment";

const Form = ({
  func,
  show,
  popupRef,
  buttons,
  title,
  description,
  startDateTime,
  endDateTime,
  meeting_link,
  location,
  category,
  recurrence,
  reminder,
  guests,
  handleChange,
  errStart,
  errEnd,
  locationIcon,
  linkIcon,
}) => {
  const getCurrentDateTimeLocal = () => {
    return moment().format("YYYY-MM-DDTHH:mm");
  };

  const getMinEndDateTime = () => {
    if ({ startDateTime }) {
      return { startDateTime };
    }
    return getCurrentDateTimeLocal();
  };

  const handleMeetingLinkClick = () => {
    if ({ meeting_link }) {
      try {
        const url = new URL({ meeting_link });
        window.open(url.href, "_blank");
      } catch (e) {
        console.error("Invalid URL:", e);
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        show ? "block" : "hidden"
      }`}
    >
      <div
        ref={popupRef}
        className="relative w-full max-w-xs p-6 bg-white rounded-lg shadow-xl sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl"
        role="dialog"
        aria-labelledby="sidebar-title"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="flex items-center justify-between">
          <h1
            id="sidebar-title"
            className="text-3xl font-bold md:text-2xl lg:text-4xl"
          >
            {func}
          </h1>
          {buttons}
        </div>

        <div className="mt-4 space-y-2 text-sm sidebar-body sm:text-base md:text-xs lg:text-base">
          <label htmlFor="title" className="block mb-1 font-bold">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Event Title"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={handleChange}
            aria-required="true"
          />

          <label htmlFor="description" className="block mb-1 font-bold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Event Description"
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={handleChange}
          />

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="flex-1">
              <label htmlFor="startDateTime" className="block mb-1 font-bold">
                Start Date
              </label>
              <input
                id="startDateTime"
                name="startDateTime"
                type="datetime-local"
                className="w-full p-2 border border-gray-300 rounded"
                value={startDateTime}
                onChange={handleChange}
                aria-required="true"
                min={getCurrentDateTimeLocal()}
              />
              {errStart && (
                <p className="mt-1 text-sm text-red-500">{errStart}</p>
              )}
            </div>

            <div className="flex-1">
              <label htmlFor="endDateTime" className="block mb-1 font-bold">
                End Date
              </label>
              <input
                id="endDateTime"
                name="endDateTime"
                type="datetime-local"
                className="w-full p-2 border border-gray-300 rounded"
                value={endDateTime}
                onChange={handleChange}
                aria-required="true"
                min={getMinEndDateTime()}
              />
              {errEnd && <p className="mt-1 text-sm text-red-500">{errEnd}</p>}
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="meeting_link"
                className="flex items-center mb-1 space-x-1 font-bold"
              >
                {linkIcon}
                <span>Meeting Link</span>
              </label>
              <input
                id="meeting_link"
                name="meeting_link"
                type="url"
                placeholder="Meeting Link"
                className="w-full p-2 border border-gray-300 rounded"
                value={meeting_link}
                onChange={handleChange}
              />
              <button
                type="button"
                className="p-0 mt-0 text-blue-500 hover:text-blue-700"
                onClick={handleMeetingLinkClick}
                disabled={!meeting_link}
              >
                Open Link
              </button>
            </div>

            <div className="flex-1">
              <label
                htmlFor="location"
                className="flex items-center mb-1 space-x-1 font-bold"
              >
                {locationIcon}
                <span>Location</span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Location"
                className="w-full p-2 border border-gray-300 rounded"
                value={location}
                onChange={handleChange}
              />
            </div>
          </div>

          <label htmlFor="Guest" className="block mb-1 font-bold">
            Guest
          </label>
          <input
            id="guests"
            name="guests"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={guests}
            onChange={handleChange}
          />

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="category" className="block mb-1 font-bold">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full p-2 border border-gray-300 rounded"
                value={category}
                onChange={handleChange}
              >
                <option value="Personal">Personal</option>
                <option value="Branch">Branch</option>
                <option value="Bank">Bank</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="recurrence" className="block mb-1 font-bold">
                Recurrence
              </label>
              <select
                id="recurrence"
                name="recurrence"
                className="w-full p-2 border border-gray-300 rounded"
                value={recurrence}
                onChange={handleChange}
              >
                <option value="Non-recurring">Non-recurring</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="reminder" className="block mb-1 font-bold">
                Reminder
              </label>
              <select
                id="reminder"
                name="reminder"
                className="w-full p-2 border border-gray-300 rounded"
                value={reminder}
                onChange={handleChange}
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

export default Form;
