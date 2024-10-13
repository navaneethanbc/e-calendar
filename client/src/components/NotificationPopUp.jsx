import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Notifications = ({ onHide }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "https://e-calendar-cocq.vercel.app/api/notifications"
        );
        setNotifications(response.data);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onHide();
      }
    };
    document.addEventListener("mousedown", handleClickOutside); // Attach the event listener to detect clicks outside
  }, [onHide]);

  const markAllUnread = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, hasBeenRead: true })));
  };

  const handleNotificationClick = async (id) => {
    try {
      await axios.post(
        `https://e-calendar-cocq.vercel.app/api/notifications/read/${id}`
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, hasBeenRead: true } : n))
      );
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div
      ref={popupRef}
      className="fixed w-full h-full max-w-[500px] p-4 overflow-y-auto shadow-[0_5px_20px_rgba(0,0,0,0.9)] max-h-[450px] top-[72px] right-[140px] sm:max-w-[425px] bg-gray-50 z-50"
    >
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center title">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <span className="px-2 py-1 ml-2 text-sm text-white bg-red-600 rounded-full">
            {notifications.filter((n) => !n.hasBeenRead).length}
          </span>
        </div>
        <button
          id="mark"
          onClick={markAllUnread}
          className="px-4 py-2 text-white bg-black rounded-md hover:bg-yellow-500"
        >
          Mark all as read
        </button>
      </header>

      {notifications.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-1">
          {notifications
            .slice()
            .reverse()
            .map((n) => (
              <div
                key={n._id}
                onClick={() => handleNotificationClick(n._id)}
                className={`notification p-4 bg-white shadow-md rounded-md ${
                  !n.hasBeenRead ? "border-l-4 border-black" : ""
                }`}
              >
                <div className="notification-content">
                  <div className="post">
                    <div>
                      <div>
                        <span className="font-semibold">
                          Category: {n.category}
                        </span>
                        <p>{n.description}</p>
                      </div>
                      <p className="text-sm text-gray-500 time">
                        {new Date(n.designated_time).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-xl font-medium text-gray-500">
            No notifications available.
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
