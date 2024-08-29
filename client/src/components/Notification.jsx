import React, { useState } from "react";
import background from "../assets/background.jpg";
import NavigationBAr from "./NavigationBar";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  function markAllUnread() {
    setNotifications((prev) => prev.map((n) => ({ ...n, hasBeenRead: true })));
  }

  function handleNotificationClick(id) {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, hasBeenRead: true } : n))
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <NavigationBAr className="w-full p-4 bg-white shadow-md" />

      <div className="flex flex-grow">
        <div className="relative w-1/2 ">
          <img
            src={background}
            alt="Background"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
        <div className="w-1/2 p-4 overflow-y-auto">
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
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Mark all as read
            </button>
          </header>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
            {notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => handleNotificationClick(n._id)}
                className={`notification p-4 bg-white shadow-md rounded-md ${
                  !n.hasBeenRead ? "border-l-4 border-blue-500" : ""
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
        </div>
      </div>
    </div>
  );
};

export default Notifications;
