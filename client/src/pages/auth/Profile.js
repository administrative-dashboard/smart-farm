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
import { MyBar } from "../../components/Drawer";
import { drawer_new_data } from "../../assets/static/mockData/new_data";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { getUserInfoFromCookies } from "../../providers/authUtils";
import axios from "axios";
import { API_URL } from "../../consts";
import { Form, ImageInput, TextInput } from "react-admin";
export const Profile = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [user, setUser] = React.useState(null);

  const userInfo = getUserInfoFromCookies();
  console.log(userInfo)
  const [formData, setFormData] = useState({});

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user_id = userInfo.user_id;
        const response = await axios.get(`${API_URL}/user/info/${user_id}`);
        setUser(response.data);
        setFormData({
          name: response.data.name,
          phone: response.data.phone_number,
          email: response.data.email,
          image: response.data.profile_image,
        });

        const response2 = await axios.get(`${API_URL}/user/community/${user_id}`);
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


  const handleReset = () => {
    setFormData({
      name: user?.name || "",
      community: user?.community || "",
      phone: user?.phone_number || "",
      email: user?.email || "",
      image: user?.profile_image || "",
    });
  };
  return (
    <Container>
      <Grid container spacing={2}>
        {!isSmallScreen && (
          <Grid item xs={12} md={3}>
            <MyBar drawerData={drawer_new_data} />
          </Grid>
        )}
        <Grid item xs={12} md={isSmallScreen ? 12 : 9}>
          <Box p={2}>
            <Typography variant="h4" gutterBottom>
              My Profile
            </Typography>
            {/* <Form redirect="dashboard" onSubmit={handleEdit}></Form> */}
            <Form redirect="dashboard" >
              <TextInput
                variant="filled"
                label="Name"
                color="primary"
                fullWidth
                margin="normal"
                source="name"
                defaultValue={formData.name}
                type="text"
              // onChange={(e) =>
              //   setFormData({ ...formData, name: e.target.value })
              // }
              />
              <ImageInput
                variant="filled"
                label="Profile image"
                color="primary"
                fullWidth
                margin="normal"
                source="image"
                defaultValue={formData.image}
              // onChange={(e) =>
              //   setFormData({ ...formData, image: e.target.value })
              // }
              />
              {formData.image && (
                <img
                  src={formData.image} // Assuming that formData.image contains the image URL
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
                source="community" // Make sure this matches the key in formData
                defaultValue={formData.community} // Use value to set the value
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
                source="phone"
                defaultValue={formData.phone}
                type="text"
              // onChange={(e) =>
              //   setFormData({ ...formData, phone: e.target.value })
              // }
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
            </Form>
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <CustomCancelButton
                onClick={handleReset}
                sx={{ backgroundColor: " #1F4700" }}
              />
              <Button
                component={Link}
                to="/users"
                variant="contained"
                color="primary"
                sx={{
                  marginLeft: "10px",
                  backgroundColor: "#1F4700",
                  color: "white",
                }}
              >
                Request
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

