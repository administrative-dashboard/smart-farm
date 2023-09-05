import React from "react";
import { Box, Container, useMediaQuery } from "@mui/material";
import { MyBar } from "../../components/Drawer";
import { SelectsGroup } from "../../components/SelectsGroup";
import villager from "../../assets/static/StatisticBackground.jpg";
import { drawer_new_data } from "../../assets/static/mockData/new_data";

export const DeviceStatisticPage = () => {
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.down("lg"));

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
      {!isLgScreen && <MyBar drawerData={drawer_new_data} />}
      <Container>
        <SelectsGroup showCommunityPicker={false}/>
      </Container>
    </Box>
  );
};
