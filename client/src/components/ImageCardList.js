import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ImageCardList = ({ data }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "30px",
      marginTop: "20px",
      marginLeft: "200px",
    }}
  >
    {data.map((item, index) => (
      <Card
        key={index}
        component="a"
        href={item.link}
        style={{ maxWidth: "280px" }}
      >
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

export default ImageCardList;
