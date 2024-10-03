import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../../assets/logo.png";
import MyDatePicker from "./DayPicker";

const Sidebar = ({ eventFcn, selected, onSelect, onCategoryChange }) => {
  const [selectedCategories, setSelectedCategories] = useState({
    Personal: true,
    Branch: true,
    Bank: true,
  });

  const handleCatagoryChecked = (event) => {
    const { id, checked } = event.target;
    setSelectedCategories((prev) => ({ ...prev, [id]: checked }));
    onCategoryChange(id, checked);
  };

  return (
    <div className="fixed h-full ml-6 w-[325px]">
      <br />
      <div className="flex items-center justify-between mb-4">
        <div
          className="flex items-center justify-center p-2 text-white transition-colors bg-black rounded-full cursor-pointer hover:bg-yellow-500"
          onClick={eventFcn}
        >
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center px-1 py-2 border-b-4 border-gray-300">
          <MyDatePicker selected={selected} onSelect={onSelect} />
        </div>
      </div>
      <br />

      <div className="flex flex-col">
        {["Personal", "Branch", "Bank"].map((category) => (
          <div key={category} className="flex flex-col px-4 mb-3 space-y-2">
            <div className="flex items-center space-x-2">
              <input
                id={category}
                type="checkbox"
                className="w-4 h-4 form-checkbox"
                style={{
                  accentColor:
                    category === "Personal"
                      ? "#b8860b"
                      : category === "Branch"
                      ? "#00008b"
                      : "#FF0000",
                }}
                onChange={handleCatagoryChecked}
                checked={selectedCategories[category]}
              />
              <label htmlFor={category} className="font-medium text-gray-700">
                {category}
              </label>
            </div>
          </div>
        ))}
      </div>
      <br />
      <div className="flex items-center px-4 mt-2 space-x-2 border-t-4 border-gray-300">
        <a href="calendar/help" style={{ textDecoration: "underline" }}>
          <br />
          <i className="mr-3 fas fa-question-circle"></i>
          Help and Feedback
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
