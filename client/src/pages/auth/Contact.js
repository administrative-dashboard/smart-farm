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
import { getUserInfoFromCookies } from "../../providers/authUtils";
import { API_URL } from "../../consts";
import {
  Button,
  Form,
  TextInput,
  useNotify,
  useRedirect
} from "react-admin";

export const Contact = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const userInfo = getUserInfoFromCookies();
  const user_id = userInfo.user_id;
  console.log("aa", user_id);
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/communities/info`).then((response) => {
      setCommunities(response.data)
    });
  }, []);

  const handleEdit = (data) => {
    data.community_id = selectedCommunity;
    data.user_id = user_id;
    console.log("Form data:", data);
    axios
      .put(`${API_URL}/user/updatephone/${user_id}`, data)
      .then(() => {
        notify('Edited successfully', { type: 'success' });
        redirect('list', 'dashboard');
      })
      .catch((error) => {
        notify(`Error: ${error.message}`, 'error');
      });

    axios
      .post(`${API_URL}/user/community/${user_id}`, { community_id: selectedCommunity })
      .then(() => {
      })
      .catch((error) => {
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
          <Form redirect="dashboard" onSubmit={handleEdit}>
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
            <TextInput
              label="Phone number"
              variant="filled"
              color="primary"
              placeholder="+374 XXXXXXXX"
              sx={{ width: "100%", mb: 3 }}
              source="phone_number"
            />
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Button type="submit" sx={{ color: 'black', fontSize: '1rem' }}>Save</Button>
            </Box>
          </Form>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};
