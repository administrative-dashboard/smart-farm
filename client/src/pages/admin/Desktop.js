import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import ImageCardList from "../../components/ImageCardList";
import users from "../../assets/static/users-svgrepo-com.svg";
import greenhouse from "../../assets/static/greenhouse(1).png";
import field from "../../assets/static/plantation.png";
import product from "../../assets/static/healthy-food.png";
import device from "../../assets/static/hammer.png";
import Statistics from "../../assets/static/analytics.png";

const imageCardData = [
  {
    img: users,
    title: "Users",
    link: "/User",
  },
  {
    img: greenhouse,
    title: "Greenhouse",
    link: "/Greenhouse",
  },
  {
    img: field,
    title: "Fields",
    link: "/fieldsInfo",
  },
  {
    img: product,
    title: "Products",
    link: "/productsInfo",
  },
  {
    img: device,
    title: "Devices",
    link: "/chooseDevice",
  },
  {
    img: Statistics,
    title: "Statistics",
    link: "/statisticsInfo",
  },
];

export const AdminDesktop = () => {
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
          <ImageCardList data={imageCardData} />
        </Container>
      </Grid>
    </Grid>
  );
};
