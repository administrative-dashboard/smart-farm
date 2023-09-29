import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Box,
  Grid,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getJwtTokenFromCookies } from "../../providers/authUtils";
import axios from "axios";
import { API_URL } from "../../consts";
import { Form,  ImageField, TextInput, useNotify, useRedirect } from "react-admin";
import { authProvider } from "../../providers/authPovider";
import { AllowedTo, AbacProvider} from "react-abac";
export const Profile = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [user, setUser] = React.useState(null);
  const [formData, setFormData] = useState({});
  const [validationError, setValidationError] = useState("");
  React.useEffect(() => {
    const fetchUserInfo = async () => {
      try {
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
        authProvider.logout();
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
    notify('Editing Canceled', { type: 'failure' });
    redirect('list', 'dashboard');
  };
  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
      return true; 
    }
    const regex = /^\+374 \d{2} \d{6}$/; // +374 99 999999
    return regex.test(phoneNumber);
  };

  useEffect(() => {
    if (!validatePhoneNumber(formData.phone_number)) {
      setValidationError("Phone number must be in the format +374 99 999999");
    } else {
      setValidationError("");
    }
  }, [formData.phone_number]);


  return (
    <AllowedTo
    >
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={isSmallScreen ? 12 : 9}>
          <Box p={2}>
            <Typography variant="h4" gutterBottom>
              My Profile
            </Typography>
            <Form redirect="dashboard"  >
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
              <TextField
                variant="filled"
                label="Profile Image"
                color="primary"
                fullWidth
                margin="normal"
                type="text"
                disabled={true}
              ></TextField>
              <ImageField source="profile_image" title="Profile Image" />
              <div>
                <img src={formData.profile_image} title="profile" />
              </div>
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
                error={Boolean(validationError)} 
                helperText={validationError}
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
              />

              <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={handleReset}
                  sx={{
                    marginLeft: "10px",
                    backgroundColor: "#1F4700",
                    color: "white",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    marginLeft: "10px",
                    backgroundColor: "#1F4700",
                    color: "white",
                  }}
                  onClick={handleUpdateUserInfo} 
                  disabled={Boolean(validationError)}
                >
                  Save
                </Button>
              </Box>
            </Form>
          </Box>
        </Grid>
      </Grid>
    </Container>
    </AllowedTo>
  );
};
