import React from "react";
import { Container, Typography, Box, useMediaQuery } from "@mui/material";
//import { MyBar } from "../../components/Drawer";
import { HomeRedirectButton } from "../../components/HomeRedirectButton";
import { CustomDeviceRequestCreate } from "../../services/owner/DeviceRequestService";
//import { owner_drawer } from "../../assets/static/mockData/owner_drawer";

export const DeviceRequest = () => {
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mx: "auto",
      }}
    >
      {/* {!isLgScreen && <MyBar drawerData={owner_drawer} />} */}
      <Container sx={{ my: "20%" }}>
        <Typography
          variant={isLgScreen ? "h6" : "h3"}
          sx={{
            color: "#004417",
            fontFamily: "Roboto",
            my: 5,
          }}
        >
          Send a request for a portable device
        </Typography>
        <CustomDeviceRequestCreate />
      </Container>
      <HomeRedirectButton pageName="OwnerPage" title="home" />
    </Box>
  );
};
