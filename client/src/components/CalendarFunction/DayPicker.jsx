import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

function MyDatePicker({ selected, onSelect }) {
  return <DayPicker mode="single" selected={selected} onSelect={onSelect} />;
}

export default MyDatePicker;
