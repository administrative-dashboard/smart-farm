import React from "react";
import { Box, Container, useMediaQuery } from "@mui/material";
import { MyBar } from "../../components/Drawer";
import { SelectsGroup } from "../../components/SelectsGroup";
import villager from "../../assets/static/StatisticBackground.jpg";
import { owner_drawer } from "../../assets/static/mockData/owner_drawer";

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
      {!isLgScreen && <MyBar drawerData={owner_drawer} />}
      <Container>
        <SelectsGroup showCommunityPicker={false}/>
      </Container>
    </Box>
  );
};
