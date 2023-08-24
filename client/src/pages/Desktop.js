import React from "react";
import { Container, Card, CardContent, Typography, Grid, Drawer } from "@mui/material";
import { MyBar } from "../components/Drawer";
import users from "../assets/static/users-svgrepo-com.svg";
import greenhouse from "../assets/static/greenhouse(1).png";
import field from "../assets/static/plantation.png";
import product from "../assets/static/healthy-food.png";
import transport from "../assets/static/tractor.png";

const imageCardData = [
  {
    img: users,
    title: "Users",
  },
  {
    img: greenhouse,
    title: "Greenhouse",
  },
  {
    img: field,
    title: "Fields",
  },
  {
    img: product,
    title: "Products",
  },
  {
    img: transport,
    title: "Transports",
  },
];

const getImageCards = () => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "30px",
      marginTop: "20px", // Adjust margin for smaller screens
    }}
  >
    {imageCardData.map((item, index) => (
      <Card key={index} style={{ maxWidth: "280px" }}>
        <img
          src={item.img}
          alt={item.title}
          style={{ width: "100%", height: "auto" }}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {item.title}
          </Typography>
        </CardContent>
      </Card>
    ))}
  </div>
);

export const AdminDesktop = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={2}>
        <MyBar />
      </Grid>
      <Grid item xs={12} md={10}>
        <Container>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: 700,
              fontFamily: "Arial, sans-serif",
              fontSize: "3rem", // Increase font size for larger screens
              mt: "40px", // Adjust margin for smaller screens
            }}
          >
            Info
          </Typography>
        </Container>
      </Grid>
      <Grid item xs={12} md={10}>
        <Container>{getImageCards()}</Container>
      </Grid>
    </Grid>
  );
};
