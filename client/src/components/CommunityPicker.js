import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export const CommunityPicker = ({ selectedCommunity, handleCommunityChange }) => {
  /*   const [selectedCommunity, setSelectedCommunity] = useState('');
   */
  /* const handleCommunityChange = (event, newValue) => {
    setSelectedCommunity(newValue);
  }; */
  const topCommunitys = [
    { label: "Վանաձոր" },
    { label: "Տավուշ" },
    { label: "Սյունիք" },
  ];
  useEffect(() => {
    console.log(selectedCommunity); // Log the updated selectedCommunity in useEffect
  }, [selectedCommunity]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={topCommunitys}
      sx={{ width: 400 }}
      renderInput={(params) => <TextField {...params} label="Community" />}
      value={selectedCommunity}
      onChange={handleCommunityChange}
    />
  );
};