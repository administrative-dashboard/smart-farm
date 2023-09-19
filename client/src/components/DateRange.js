// DateRange.js
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

export const DateRange = ({ value, setValue, inAdmin }) => {
  const datePickerSize = inAdmin ? 600 : 500;
  console.log("inAdmin:", inAdmin);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          sx={{ width: datePickerSize }}
        />
      </LocalizationProvider>
    </div>
  );
};
