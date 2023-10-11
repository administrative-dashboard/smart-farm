import React from "react";
import { Box } from "@mui/material";
import villager from "../../assets/static/StatisticBackground.jpg";


export const DeviceStatisticPage = () => {

  return (
    <Box
      style={{
        display: "flex",
        backgroundImage: `url(${villager})`,
        backgroundSize: "cover",
        backgroundPosition: "right",
        minHeight: "95.1vh",
      }}
    >
    </Box>
  );
};
