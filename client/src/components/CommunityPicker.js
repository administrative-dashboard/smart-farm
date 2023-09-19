// CommunityPicker.js
import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme"; // Import the shared theme

export const CommunityPicker = ({
  selectedCommunity,
  handleCommunityChange,
}) => {
  const topCommunitys = [
    { label: "Վանաձոր" },
    { label: "Տավուշ" },
    { label: "Սյունիք" },
  ];
  useEffect(() => {
    console.log(selectedCommunity); // Log the updated selectedCommunity in useEffect
  }, [selectedCommunity]);

  return (
    <ThemeProvider theme={Theme}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={topCommunitys}
        sx={{ width: 500 }}
        renderInput={(params) => <TextField {...params} label="Community" />}
        value={selectedCommunity}
        onChange={handleCommunityChange}
      />
    </ThemeProvider>
  );
};
