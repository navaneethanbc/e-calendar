import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../../assets/logo.png";

const Sidebar = ({ setView, ViewsDAY, ViewsWEEK, ViewsMONTH, eventFcn }) => {
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [workChecked, setWorkChecked] = useState(false);
  const [eventsChecked, setEventsChecked] = useState(false);
  const [remindersChecked, setRemindersChecked] = useState(false);

  const handleWorkChange = (e) => {
    setWorkChecked(e.target.checked);
  };

  const handleEventsChange = (e) => {
    const isChecked = e.target.checked;
    setEventsChecked(isChecked);
    if (isChecked && !workChecked) {
      setWorkChecked(true);
    }
  };

  const handleRemindersChange = (e) => {
    const isChecked = e.target.checked;
    setRemindersChecked(isChecked);
    if (isChecked && !workChecked) {
      setWorkChecked(true);
    }
  };

  const handleEmailChange = (event) => {
    setIsEmailChecked(event.target.checked);
  };

  return (
    <div className="ml-6">
    <div className="flex flex-col max-w-72">
        <img src={logo} alt="Logo" className="w-48 h-auto" />
      </div> 

      <div className="flex flex-col max-w-72 ">
        <button
          className="flex items-center px-4 py-2 font-bold border-t-4 border-gray-300 btn"
          onClick={() => setView(ViewsDAY)}
        >
          <i className="mr-3 fas fa-calendar-day"></i>Day
        </button>

        <button
          className="flex items-center px-4 py-2 font-bold border-t-4 border-gray-300 btn"
          onClick={() => setView(ViewsWEEK)}
        >
          <i className="mr-3 icon fa fa-calendar-week"></i> Week
        </button>
        <button
          className="flex items-center px-4 py-4 font-bold border-t-4 border-b-4 border-gray-300 btn"
          onClick={() => setView(ViewsMONTH)}
        >
          <i className="mr-3 icon fa fa-calendar-alt"></i> Month
        </button>
      </div>
      <br />

      <div className="flex flex-col max-w-72">
        <button
          className="flex items-center px-4 py-2 bg-green-500 border-t-4 border-b-4 border-gray-300 btn"
          onClick={eventFcn}
        >
          Add Event
        </button>
      </div>

      <br />

      <div className="flex flex-col max-w-72">
        <div className="flex items-center px-4 py-2 border-b-4 border-gray-300">
          <h2 className="text-lg font-semibold">Other Calendars</h2>
          <a
            href="/choosecalendar"
            className="flex items-center justify-center p-2 ml-4 text-white transition-colors bg-green-500 rounded-full hover:bg-green-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
          </a>
        </div>

        <div className="flex items-center px-4 py-2 space-x-2">
          <input
            id="Holiday"
            type="checkbox"
            className="w-4 h-4 form-checkbox accent-yellow-400"
          />
          <label htmlFor="Holiday" className="font-medium text-gray-700">
            Holidays in Sri Lanka
          </label>
        </div>

        <div className="flex flex-col px-4 mb-3 space-y-2">
          <div className="flex items-center space-x-2">
            <input
              id="email"
              type="checkbox"
              className="w-4 h-4"
              onChange={handleEmailChange}
            />
            <label htmlFor="email" className="font-medium text-gray-700">
              Email
            </label>
          </div>

          {isEmailChecked && (
            <div className="flex flex-col px-4 mt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  id="events"
                  type="checkbox"
                  className="w-4 h-4 form-checkbox accent-purple-600"
                />
                <label htmlFor="events">Events</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="reminder"
                  type="checkbox"
                  className="w-4 h-4 form-checkbox accent-green-600"
                />
                <label htmlFor="reminder">Reminder</label>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center px-4 space-x-2">
          <input
            id="Work"
            type="checkbox"
            className="w-4 h-4"
            checked={workChecked}
            onChange={handleWorkChange}
          />
          <label htmlFor="Work" className="font-medium text-gray-700">
            Work
          </label>
        </div>
        <div className="flex flex-col px-4 mt-2 space-y-2">
          <div className="flex items-center px-4 mt-2 space-x-2">
            <input
              id="Events"
              type="checkbox"
              className="w-4 h-4 form-checkbox accent-blue-500"
              checked={eventsChecked}
              onChange={handleEventsChange}
            />
            <label htmlFor="Events" className="font-medium text-gray-700">
              Events
            </label>
          </div>

          <div className="flex items-center px-4 mt-2 space-x-2">
            <input
              id="Reminders"
              type="checkbox"
              className="w-4 h-4 form-checkbox accent-red-600"
              checked={remindersChecked}
              onChange={handleRemindersChange}
            />
            <label htmlFor="Reminders" className="font-medium text-gray-700">
              Reminders
            </label>
          </div>
        </div>
      </div>

      <br />
      <div className="flex items-center px-4 mt-2 space-x-2 border-t-4 border-gray-300 max-w-72">
        <a href="calendar/help" style={{ textDecoration: "underline" }}>
          <i className="mr-3 fas fa-question-circle "></i>
          Help and Feedback
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
