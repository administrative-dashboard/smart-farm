// Profile.js
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
import { validatePhoneNumber } from "../../validations/PhoneNumber";

export const Profile = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const initialFormData = {
    name: "",
    community: "",
    phone: "",
    email: "",
    role: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isArmenianPhoneNumber, setIsArmenianPhoneNumber] = useState(true);
  const [isZeroAfterPrefix, setIsZeroAfterPrefix] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = () => {
    setFormData(initialFormData);
    setIsArmenianPhoneNumber(true);
    setIsZeroAfterPrefix(false);
    setError(null);
  };

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value;
    setFormData({ ...formData, phone: phoneNumber });

    const { isArmenian, isZeroAfterPrefix, isPhoneNumberValid, error } = validatePhoneNumber(phoneNumber);

    setIsArmenianPhoneNumber(isArmenian);
    setIsZeroAfterPrefix(isZeroAfterPrefix);
    setError(error);

    // Clear the error message after a brief delay (optional)
    if (error) {
      setTimeout(() => setError(null), 3000); // Clear error after 3 seconds (adjust as needed)
    }
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
              New Data
            </Typography>
            <TextField
              variant="filled"
              label="Name"
              color="primary"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              variant="filled"
              label="Profile image"
              color="primary"
              fullWidth
              margin="normal"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            <TextField
              variant="filled"
              label="Community"
              color="primary"
              fullWidth
              margin="normal"
              value={formData.community}
              onChange={(e) => setFormData({ ...formData, community: e.target.value })}
            />
            <TextField
              variant="filled"
              label="Phone"
              color="primary"
              fullWidth
              margin="normal"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="+374XXXXXXXX"
            />
            {!isArmenianPhoneNumber || error ? (
              <Typography variant="body2" color="error">
                {error || "Phone number must start with '+374' and should have exactly 8 digits following the prefix."}
              </Typography>
            ) : isZeroAfterPrefix ? (
              <Typography variant="body2" color="error">
                "0" after "+374" is not allowed.
              </Typography>
            ) : formData.phone.length !== 12 ? (
              <Typography variant="body2" color="error">
                Exactly 8 digits are required after "+374."
              </Typography>
            ) : null}
            <TextField
              variant="filled"
              label="Email"
              color="primary"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Box display="flex" justifyContent="flex-end" mt={3}>
              <CustomCancelButton onClick={handleReset} sx={{ backgroundColor: " #1F4700" }} />
              <Button
                component={Link}
                to="/users"
                variant="contained"
                color="primary"
                sx={{
                  marginLeft: "10px",
                  backgroundColor: isArmenianPhoneNumber && !isZeroAfterPrefix && !error ? "#2BB31C" : "#C0C0C0",
                  color: "white",
                }}
                disabled={!formData.phone || !isArmenianPhoneNumber || isZeroAfterPrefix || error || formData.phone.length !== 12}
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
