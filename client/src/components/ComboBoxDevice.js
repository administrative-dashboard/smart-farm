// ComboBoxDevice.js
import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme"; // Import the shared theme

export const ComboBoxDevice = ({ selectedDevice, handleDeviceChange }) => {
  const topDevices = [
    { label: "Բահ", year: 1994 },
    { label: "Փոցխ", year: 1972 },
    { label: "Գերանդի", year: 1974 },
  ];
  useEffect(() => {
    console.log(selectedDevice); // Log the updated selectedDevice in useEffect
  }, [selectedDevice]);

  return (
    <ThemeProvider theme={Theme}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={topDevices}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Device" />}
        value={selectedDevice}
        onChange={handleDeviceChange}
      />
    </ThemeProvider>
  );
};
