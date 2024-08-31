import React from "react";
import "./SearchBar.css";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  category,
  setCategory,
  recurrenceType,
  setRecurrenceType,
  reminderType,
  setReminderType,
  onSearch,
}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="Start date"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="End date"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Personal">Personal</option>
        <option value="Branch">Branch</option>
        <option value="Organization">Organization</option>
      </select>
      <select
        value={recurrenceType}
        onChange={(e) => setRecurrenceType(e.target.value)}
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
      >
        <option value="">All Reminder Types</option>
        <option value="None">None</option>
        <option value="10 minutes before">10 minutes before</option>
        <option value="30 minutes before">30 minutes before</option>
        <option value="1 hour before">1 hour before</option>
        <option value="1 day before">1 day before</option>
      </select>
      <button className="search-button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
