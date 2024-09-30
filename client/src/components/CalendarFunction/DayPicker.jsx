// import React from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/style.css";

// function MyDatePicker({ selected, onSelect }) {
//   return <DayPicker mode="single" selected={selected} onSelect={onSelect} />;
// }

// export default MyDatePicker;

import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";

export default function MyDatePicker({ selected, onSelect }) {
  const value = selected ? dayjs(selected) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        orientation="landscape"
        value={value}
        onChange={(newValue) => {
          onSelect(newValue?.toDate() || null);
        }}
        showToolbar={false}
        componentsProps={{
          actionBar: {
            actions: [],
          },
        }}
        closeOnSelect={false}
        displayStaticWrapperAs="desktop"
        sx={{ backgroundColor: "beige" }}
      />
    </LocalizationProvider>
  );
}
