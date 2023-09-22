import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Box,
  Grid,
  useMediaQuery,
  Button,
} from "@mui/material";
import { CustomCancelButton } from "../../components/CancelButton";
//import { MyBar } from "../../components/Drawer";
//import { drawer_new_data } from "../../assets/static/mockData/new_data";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { getJwtTokenFromCookies} from "../../providers/authUtils";
import axios from "axios";
import { API_URL } from "../../consts";
import { Form, ImageInput, TextInput, useNotify, useRedirect } from "react-admin";
export const Profile = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [user, setUser] = React.useState(null);
  const [formData, setFormData] = useState({});

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // const user_id = userInfo.user_id;
        const response = await axios.get(
          `${API_URL}/user/info`,
          {
            headers: {
              Authorization: `Bearer ${getJwtTokenFromCookies()}`
            }
          }
        );
        setUser(response.data);
        setFormData({
          name: response.data.name,
          phone_number: response.data.phone_number,
          email: response.data.email,
          profile_image: response.data.profile_image,
        });

        const response2 = await axios.get(
          `${API_URL}/user/community`,
          {
            headers: {
              Authorization: `Bearer ${getJwtTokenFromCookies()}`
            }
          }
          );
        console.log(response2.data);
        setFormData((prevFormData) => ({
          ...prevFormData,
          community: response2.data,
        }));
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdateUserInfo = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/user/info`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getJwtTokenFromCookies()}`,
          },
        }
      )
      .then(() => {
        notify('Edited successfully', { type: 'success' });
        redirect('list', 'dashboard');
        console.log("hjdksf", typeof formData.profile_image);
      })
      .catch((error) => {
        notify(`Error: ${error.message}`, 'error');
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      name: user?.name || "",
      community: user?.community || "",
      phone_number: user?.phone_number || "",
      email: user?.email || "",
      profile_image: user?.profile_image || "",
    });
  };
  return (
    <Container>
      <Grid container spacing={2}>
        {/* {!isSmallScreen && (
          <Grid item xs={12} md={3}>
            <MyBar drawerData={drawer_new_data} />
          </Grid>
        )} */}
        <Grid item xs={12} md={isSmallScreen ? 12 : 9}>
          <Box p={2}>
            <Typography variant="h4" gutterBottom>
              My Profile
            </Typography>
            {/* <Form redirect="dashboard" onSubmit={handleEdit}></Form> */}
            <Form redirect="dashboard" onSubmit={handleUpdateUserInfo} >
              <TextInput
                variant="filled"
                label="Name"
                color="primary"
                fullWidth
                margin="normal"
                source="name"
                defaultValue={formData.name}
                type="text"
              onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
             <ImageInput
  variant="filled"
  label="Profile image"
  color="primary"
  fullWidth
  margin="normal"
  source="profile_image"
  defaultValue={formData.profile_image}
  onChange={(e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile_image: file });
  }}
  accept="image/*"
  multiple={false}
/>
              {formData.profile_image && (
          <img
            src={formData.profile_image} 
            alt="Profile"
            style={{ width: "15%" }}
          />
        )}
              <TextInput
                variant="filled"
                label="Community"
                color="primary"
                fullWidth
                margin="normal"
                source="community" 
                defaultValue={formData.community}
                disabled={true}
                type="text"
              // onChange={(e) =>
              //   setFormData({ ...formData, community: e.target.value })
              // }
              />
              <TextInput
                variant="filled"
                label="Phone"
                color="primary"
                fullWidth
                margin="normal"
                source="phone_number"
                defaultValue={formData.phone_number}
                type="text"
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              />
              <TextInput
                variant="filled"
                label="Email"
                color="primary"
                fullWidth
                margin="normal"
                source="email"
                type="email"
                defaultValue={formData.email}
                disabled={true}
              // onChange={(e) =>
              //   setFormData({ ...formData, email: e.target.value })
              // }
              />
       
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <CustomCancelButton
                onClick={handleReset}
                sx={{ backgroundColor: " #1F4700" }}
              />
              <Button type="submit"
                variant="contained"
                color="primary"
                sx={{
                  marginLeft: "10px",
                  backgroundColor: "#1F4700",
                  color: "white",
                }}
              >
                Save
              </Button>
              
            </Box>
            </Form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

