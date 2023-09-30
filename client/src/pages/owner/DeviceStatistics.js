import React from "react";
import { Box, Container, useMediaQuery } from "@mui/material";
import { SelectsGroup } from "../../components/SelectsGroup";
import villager from "../../assets/static/StatisticBackground.jpg";


export const DeviceStatisticPage = () => {

  return (
    <Box
      style={{
        display: "flex",
        backgroundImage: `url(${villager})`, // Replace with the actual path to your image
        backgroundSize: "cover",
        backgroundPosition: "right",
        minHeight: "95.1vh",
      }}
    >
      <Container>
        <SelectsGroup showCommunityPicker={false}/>
      </Container>
    </Box>
  );
};
