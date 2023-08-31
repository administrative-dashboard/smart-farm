import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  useMediaQuery,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { MyBar } from "../../components/Drawer";
import villager from "../../assets/static/villager.jpg";
import { Button } from "react-admin";
import { drawer_new_data } from "../../assets/static/mockData/new_data";
export const ChooseCommunity = () => {
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [community, setCommunity] = useState("");
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);
  const communityMockOptions = [
    { id: 1, name: "Vanadzor" },
    { id: 2, name: "Spitak" },
    { id: 3, name: "Stepanavan" },
  ];

  const handleChange = (e) => {
    setCommunity(e.target.value);
    setNextButtonEnabled(true);
  };

  const containerStyle = {
    backgroundImage: `url(${villager})`, // Apply the background image here
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "90vh",
        ...containerStyle,
      }}
    >
      {!isLgScreen && <MyBar drawerData={drawer_new_data} />}
      <Container
        sx={{
          m: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255,0.7 )",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Roboto",
            my: 5,
          }}
        >
          Choose the community
        </Typography>
        <FormControl sx={{ mb: 5, width: "30%" }}>
          <InputLabel htmlFor="community-select" sx={{ color: "1f4700" }}>
            Community
          </InputLabel>
          <Select
            id="community-select"
            value={community}
            onChange={handleChange}
          >
            {communityMockOptions.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Link to="/ChooseDevice">
          <Button
            variant="contained"
            sx={{
              background: "#1f4700",
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
