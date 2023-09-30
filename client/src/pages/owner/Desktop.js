import * as React from "react";
import { Container, useMediaQuery, Box, Typography } from "@mui/material";
import { ownerItemData } from "../../assets/static/mockData/owner.mockData";
import { CustomImageList } from "../../components/ImageList";

export const OwnerDesktop = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Container sx={{ m: "auto" }}>
        <Typography
          variant="h3"
          sx={{
            color: "#004417",
            fontFamily: "Roboto",
            mt: 5,
            ml: "20%",
          }}
        >
          My properties
        </Typography>
        <CustomImageList data={ownerItemData} />
      </Container>
    </Box>
  );
};
