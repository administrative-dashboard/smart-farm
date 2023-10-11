import React from "react";
import { Container, Typography, Box, useMediaQuery } from "@mui/material";
import { CustomDeviceRequestCreate } from "../../services/owner/DeviceRequestService";

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
    </Box>
  );
};
