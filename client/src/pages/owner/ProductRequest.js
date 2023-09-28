import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { HomeRedirectButton } from "../../components/HomeRedirectButton";
import { CustomProductRequestCreate } from "../../services/owner/ProductRequestService";

export const ProductRequest = () => {
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
          variant={"h3"}
          sx={{
            color: "#004417",
            fontFamily: "Roboto",
            my: 5,
          }}
        >
          Send a request for a product
        </Typography>
        <CustomProductRequestCreate />
      </Container>
      <HomeRedirectButton pageName="ownerPage" title="home" />
    </Box>
  );
};
