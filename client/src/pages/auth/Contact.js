import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  useMediaQuery,
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { SaveButton } from "../../components/SaveButton";
import { theme } from "../../themes/theme";
import signBack from "../../assets/static/signBack.png";
import axios from "axios";
import { getUserInfoFromCookies } from "../../providers/authUtils";
import { API_URL } from "../../consts";

export const Contact = () => {
  const user_id = getUserInfoFromCookies().user_id;
  console.log(user_id)
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/communities/info`).then((response) => {
      setCommunities(response.data)
    });
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log("Before PUT request");
    if (user_id) {
    try {
      const response = await axios.put(
        `${API_URL}/user/updatephone/${user_id}`,
        {
          phone_number: phoneNumber,
        }
      );
      console.log('User updated:', response.data);
    }catch (error) {
      console.error("Error updating user:", error);
    }
    console.log("After PUT request");

  }}
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        xs={12}
        zeroMinWidth
        sx={{
          backgroundImage: `url(${signBack})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          padding: "0",
        }}
      >
        <Box
          sx={{
            p: 4,
            background: "rgba(255, 255, 255, 0.75)",
            borderRadius: "40px",
            height: "auto",
            maxHeight: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!isSmallScreen && (
            <>
              <Typography
                component="span"
                variant="h5"
                sx={{ color: "#38A505", display: "inline", mb: 4 }}
              >
                Smart Farm
              </Typography>
              <Typography variant="h4" sx={{ display: "inline", mb: 10 }}>
                Enter your contacts
              </Typography>
            </>
          )}
          <form   >
            <TextField
              id="filled-select-community"
              select
              label="Select Community"
              variant="filled"
              color="primary"
              sx={{
                width: "100%",
                mb: 3,
              }}
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
            >
              {communities.map((community) => (
                <MenuItem key={community.id} value={community.id}>
                  {community.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Phone number"
              variant="filled"
              color="primary"
              placeholder="+374 XXXXXXXX"
              sx={{ width: "100%", mb: 3 }}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <SaveButton onSubmit={handleSubmit}/>
            </Box>
          </form>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};
