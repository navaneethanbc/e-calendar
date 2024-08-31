import React from "react";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  startDate,
  setStartDate,
  category,
  setCategory,
  recurrenceType,
  setRecurrenceType,
  reminderType,
  setReminderType,
  onSearch,
}) => {
  return (
    <div className="flex items-center gap-2 p-4">
      <div className="flex-grow">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="min-w-[150px] mb-[10px]">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start date"
          className="w-full p-2 border border-gray-300 rounded-md h-[38.5px]"
        />
      </div>
      <div className="min-w-[150px]">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Categories</option>
          <option value="Personal">Personal</option>
          <option value="Branch">Branch</option>
          <option value="Organization">Organization</option>
        </select>
      </div>
      <div className="min-w-[150px]">
        <select
          value={recurrenceType}
          onChange={(e) => setRecurrenceType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Recurrence Types</option>
          <option value="Non-recurring">Non-recurring</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Annually">Annually</option>
        </select>
      </div>
      <div className="min-w-[150px]">
        <select
          value={reminderType}
          onChange={(e) => setReminderType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Reminder Types</option>
          <option value="None">None</option>
          <option value="10 minutes before">10 minutes before</option>
          <option value="30 minutes before">30 minutes before</option>
          <option value="1 hour before">1 hour before</option>
          <option value="1 day before">1 day before</option>
        </select>
      </div>
      <div className="min-w-[150px] mb-6 ">
        <button
          className="w-full h-[36.5px] flex items-center justify-center text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={onSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
