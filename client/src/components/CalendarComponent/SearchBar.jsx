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
      <input
        type="text"
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded-md flex-grow min-w-[150px]"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="Start date"
        className="p-2 border border-gray-300 rounded-md min-w-[150px] "
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border border-gray-300 rounded-md min-w-[150px]"
      >
        <option value="">All Categories</option>
        <option value="Personal">Personal</option>
        <option value="Branch">Branch</option>
        <option value="Organization">Organization</option>
      </select>
      <select
        value={recurrenceType}
        onChange={(e) => setRecurrenceType(e.target.value)}
        className="p-2 border border-gray-300 rounded-md min-w-[150px]"
      >
        <option value="">All Recurrence Types</option>
        <option value="Non-recurring">Non-recurring</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Annually">Annually</option>
      </select>
      <select
        value={reminderType}
        onChange={(e) => setReminderType(e.target.value)}
        className="p-2 border border-gray-300 rounded-md min-w-[150px]"
      >
        <option value="">All Reminder Types</option>
        <option value="None">None</option>
        <option value="10 minutes before">10 minutes before</option>
        <option value="30 minutes before">30 minutes before</option>
        <option value="1 hour before">1 hour before</option>
        <option value="1 day before">1 day before</option>
      </select>
      <button
        className="p-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
