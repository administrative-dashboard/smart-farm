//contact.js
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
import { theme } from "../../themes/theme";
import signBack from "../../assets/static/signBack.png";
import axios from "axios";
import { getJwtTokenFromCookies } from "../../providers/authUtils";
// import { API_URL } from "../../consts";
import { Button, Form, useNotify, useRedirect } from "react-admin";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const API_URL = process.env.REACT_APP_API_URL;

export const Contact = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [communities, setCommunities] = useState([]);
  const [phone_number, setPhoneNumber] = useState("");
  useEffect(() => {
    axios
      .get(`${API_URL}/community/info`, {
        headers: {
          Authorization: `Bearer ${getJwtTokenFromCookies()}`,
        },
      })
      .then((response) => {
        setCommunities(response.data);
      });
  }, []);

  const handleEdit = () => {
    axios
      .put(
        `${API_URL}/user/updatephone`,
        { phone_number },
        {
          headers: {
            Authorization: `Bearer ${getJwtTokenFromCookies()}`,
          },
        }
      )
      .then(() => {
        notify("Edited successfully", { type: "success" });
        redirect("list", "dashboard");
      })
      .catch((error) => {
        notify(`Error: ${error.message}`, "error");
      });

    axios
      .put(
        `${API_URL}/user/community`,
        { community_id: selectedCommunity },
        {
          headers: {
            Authorization: `Bearer ${getJwtTokenFromCookies()}`,
          },
        }
      )
      .then(() => {
        notify("Edited successfully", { type: "success" });
      })
      .catch((error) => {
        notify(`Error: ${error.message}`, "error");
      });
  };
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
                variant="h4"
                sx={{ color: "#38A505", display: "inline", mb: 4 }}
              >
                Smart Farm
              </Typography>
              <Typography variant="h4" sx={{ display: "inline", mb: 10 }}>
                Enter your contacts
              </Typography>
            </>
          )}
          <Form redirect="dashboard" onSubmit={handleEdit}>
            <TextField
              id="filled-select-community"
              select
              label="Select Community"
              variant="filled"
              sx={{
                width: "100%",
                mb: 3,
                "& .MuiFilledInput-input": {
                  color: "green", // Set the text color to white
                },
                "& .MuiInputLabel-root": {
                  // color: "green", // Set the label color to white
                },
                "& .MuiFilledInput-root": {
                  backgroundColor: "white", // Set the background color to white
                },
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
            {/* <TextInput
              label="Phone number"
              variant="filled"
              color="primary"
              placeholder="+374 XXXXXXXX"
              sx={{ width: "100%", mb: 3 }}
              source="phone_number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            /> */}
            <PhoneInput
              defaultCountry="am"
              value={phone_number}
              onChange={(phone) => setPhoneNumber(phone)}
            />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                p: 4,
              }}
            >
              <Button
                type="submit"
                sx={{ color: "black", fontSize: "1rem", y: 4 }}
              >
                Save
              </Button>
            </Box>
          </Form>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};
