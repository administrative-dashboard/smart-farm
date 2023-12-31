// DeviceInfo.js
import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
} from "@mui/material";
import MultiCardList from "../../components/MultiCardList";
import { deviceItemData } from "../../assets/static/mockData/device.mockData";

export const ChooseDevice = () => {

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelection = (cardTitle, cardLink) => {
    if (selectedCard === cardTitle) {
      // եթե քարտը նորից ենք սեղմում, selected լինելը false է
      setSelectedCard(null);
    } else {
      setSelectedCard({ title: cardTitle, link: cardLink });
    }
  };

  // ստուգում ենք card-ը selected է թե ոչ
  const nextButtonEnabled = selectedCard !== null;

  const selectedDeviceType = selectedCard ? selectedCard.link : "";
  console.log(selectedCard);
  console.log(selectedDeviceType);
  const path = `/all_${selectedDeviceType}`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Container
        sx={{
          m: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "#004417",
            fontFamily: "Roboto",
            my: 5,
          }}
        >
          Choose type of device
        </Typography>
        <MultiCardList
          data={deviceItemData}
          selectedCard={selectedCard}
          handleCardSelection={handleCardSelection}
        />
        <Link to={path}>
          <Button
            variant="contained"
            sx={{
              background: "#1f4700",
              mt: 5,
              mb: 5,
              fontFamily: "Roboto",
              "&:hover": {
                backgroundColor: "rgba(0,190,0,1)",
              },
            }}
            disabled={!nextButtonEnabled}
          >
            Next
          </Button>
        </Link>
      </Container>
    </Box>
  );
};
