import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import ImageCardList from "../../components/ImageCardList";
import { communityManagerData } from "../../assets/static/mockData/community_manager.mockData";

export const CommunityManager = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={10}>
        <Container>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: 700,
              fontFamily: "Roboto",
              fontSize: "3rem",
              mt: "40px",
              ml: "20%",
            }}
          >
            Info
          </Typography>
        </Container>
      </Grid>
      <Grid item xs={12} md={10}>
        <Container>
          <ImageCardList data={communityManagerData} />
        </Container>
      </Grid>
    </Grid>
  );
};
