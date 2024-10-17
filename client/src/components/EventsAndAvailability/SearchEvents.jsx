import React from "react";
import { TextField, Select, MenuItem } from "@mui/material";

const SearchEvents = ({ searchevent, setSearchEvent }) => {
  const handleChange = ({ currentTarget: input }) => {
    setSearchEvent({ ...searchevent, [input.name]: input.value });
  };

  const handleCategoryChange = (event) => {
    setSearchEvent((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  return (
    <form
      className="flex items-center space-x-2"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <TextField
        value={searchevent.title}
        name="title"
        type="text"
        placeholder="Search title"
        variant="outlined"
        size="small"
        onChange={handleChange}
        InputProps={{
          style: {
            backgroundColor: "#F5F5DC",
            fontSize: "1rem",
            padding: "0",
            height: "2rem",
          },
        }}
        sx={{ width: "180px" }}
      />
      <Select
        value={searchevent.category || ""}
        placeholder="category"
        onChange={handleCategoryChange}
        variant="outlined"
        size="small"
        displayEmpty
        sx={{
          backgroundColor: "#F5F5DC",
          height: "2rem",
          width: "110px",
          fontSize: "1rem",
        }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Personal">Personal</MenuItem>
        <MenuItem value="Branch">Branch</MenuItem>
        <MenuItem value="Bank">Bank</MenuItem>
      </Select>
      <TextField
        value={searchevent.from}
        name="from"
        type="date"
        variant="outlined"
        size="small"
        onChange={handleChange}
        InputProps={{
          style: {
            backgroundColor: "#F5F5DC",
            fontSize: "1rem",
            padding: "0",
            height: "2rem",
          },
        }}
        sx={{ width: "150px" }}
      />
      <TextField
        value={searchevent.to}
        name="to"
        type="date"
        variant="outlined"
        size="small"
        onChange={handleChange}
        InputProps={{
          style: {
            backgroundColor: "#F5F5DC",
            fontSize: "1rem",
            padding: "0",
            height: "2rem",
          },
        }}
        sx={{ width: "150px" }}
      />
    </form>
  );
};

export default SearchEvents;
