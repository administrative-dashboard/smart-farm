import React, { useEffect, useState } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";
import { MyBar } from "../../components/Drawer";
import { SelectsGroup } from "../../components/SelectsGroup";
import villager from "../../assets/static/StatisticBackground.jpg";
import { drawer_new_data } from "../../assets/static/mockData/new_data";
import { API_URL } from "../../consts";
import { getJwtTokenFromCookies } from "../../providers/authUtils";
import axios from "axios";

export const DeviceStatisticPage = () => {
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [communityName, setCommunityName] = useState("");

  const getCommunityName = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/community`, {
        headers: {
          Authorization: `Bearer ${getJwtTokenFromCookies()}`, 
        },
      });      
      setCommunityName(response.data);
      console.log("Community name", response.data);
    } catch (error) {
      console.error("Error fetching community name:", error);
    }
  };

  // Call the function to get the community name when your component mounts or as needed
  useEffect(() => {
    getCommunityName();
  }, []);
  console.log("Community name", communityName);
  return (
    <Box
      style={{
        display: "flex",
        backgroundImage: `url(${villager})`, // Replace with the actual path to your image
        backgroundSize: "cover",
        backgroundPosition: "right",
        minHeight: "95.1vh",
      }}
    >
      {!isLgScreen && <MyBar drawerData={drawer_new_data} />}
      <Container>
        <iframe
          src={`http://localhost:7000/d-solo/b7519d35-952b-4d17-b0b5-55b5dd46a56a/new-dashboard?orgId=1&var-community=${communityName}&from=1696427711668&to=1696449311668&panelId=1`}
          width="700"
          height="700"
          frameborder="0"
        ></iframe>
        <SelectsGroup showCommunityPicker={true} />
      </Container>
    </Box>
  );
};
