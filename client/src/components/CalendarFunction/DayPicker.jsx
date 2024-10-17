import React from "react";
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
        sx={{
          backgroundColor: "transparent",
          height: "38vh",
          width: "12vw",
          ml: { sm: "-1.2vw", md: "-0.5vw" },
        }}
      />
    </LocalizationProvider>
  );
}
