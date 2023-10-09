//client/owner/Desktop.js
import * as React from "react";
import { Container, Box, Typography } from "@mui/material";
import { deviceItemData } from "../../assets/static/mockData/device.mockData";
import { CustomImageList } from "../../components/ImageList";

export const DeviceDesktop = () => {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "90vh",
      }}
    >
      
      <Container sx={{ m: "auto" }}>
        <Typography
          variant="h3"
          sx={{
            color: "#004417",
            fontFamily: "Roboto",
            my: 5,
            ml: "20%",
          }}
        >
          Choose type of device
        </Typography>
        <CustomImageList data={deviceItemData} />
      </Container>
      
    </Box>
  );
};
