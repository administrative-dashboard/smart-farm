import React from "react";
import { Container, Grid, Typography } from "@mui/material";
//import { MyBar } from "../../components/Drawer";
import ImageCardList from "../../components/ImageCardList";
import users from "../../assets/static/users-svgrepo-com.svg";
import greenhouse from "../../assets/static/greenhouse(1).png";
import field from "../../assets/static/plantation.png";
import product from "../../assets/static/healthy-food.png";
import device from "../../assets/static/hammer.png";
import Statistics from "../../assets/static/analytics.png";
//import { drawer_new_data } from "../../assets/static/mockData/new_data";
const imageCardData = [
  {
    img: users,
    title: "Users",
    link: "community/users",
  },
  {
    img: greenhouse,
    title: "Greenhouse",
    link: "#admin/greenhousesInfo",
  },
  {
    img: field,
    title: "Fields",
    link: "#admin/fieldsInfo",
  },
  {
    img: product,
    title: "Products",
    link: "#admin/productsInfo",
  },
  {
    img: device,
    title: "Devices",
    link: "#/ChooseCommunity",
  },
  {
    img: Statistics,
    title: "Statistics",
    link: "#admin/statisticsInfo",
  },
];

export const DesktopInfo = () => {
  return (
    <Grid container>
      {/* <Grid item xs={12} md={2}>
        <MyBar drawerData={drawer_new_data} />
      </Grid> */}
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
