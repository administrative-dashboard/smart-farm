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
  const [isMoreThan8Digits, setIsMoreThan8Digits] = useState(false);

  const handleReset = () => {
    setFormData(initialFormData);
    setIsArmenianPhoneNumber(true);
    setIsZeroAfterPrefix(false);
    setIsMoreThan8Digits(false);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const armenianPrefix = "+374";
    return (
      phoneNumber.startsWith(armenianPrefix) && !phoneNumber.startsWith("+3740")
    );
  };

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value;
    setFormData({ ...formData, phone: phoneNumber });

    const isArmenian = validatePhoneNumber(phoneNumber);
    setIsArmenianPhoneNumber(isArmenian);

    if (phoneNumber.startsWith("+3740")) {
      setIsZeroAfterPrefix(true);
    } else {
      setIsZeroAfterPrefix(false);
    }

    if (isArmenian) {
      const digitsAfterPrefix = phoneNumber.substring(4);
      if (digitsAfterPrefix.length > 8) {
        setIsMoreThan8Digits(true);
      } else {
        setIsMoreThan8Digits(false);
      }
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
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              variant="filled"
              label="Profile image"
              color="primary"
              fullWidth
              margin="normal"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
            <TextField
              variant="filled"
              label="Community"
              color="primary"
              fullWidth
              margin="normal"
              value={formData.community}
              onChange={(e) =>
                setFormData({ ...formData, community: e.target.value })
              }
            />
            <TextField
              variant="filled"
              label="Phone"
              color="primary"
              fullWidth
              margin="normal"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="+374XXXXXX"
            />
            {!isArmenianPhoneNumber ? (
              <Typography variant="body2" color="error">
                Phone number must start with "+374" and should not have "0"
                after the prefix.
              </Typography>
            ) : isZeroAfterPrefix ? (
              <Typography variant="body2" color="error">
                "0" after "+374" is not allowed.
              </Typography>
            ) : isMoreThan8Digits ? (
              <Typography variant="body2" color="error">
                More than 8 digits are not allowed after "+374."
              </Typography>
            ) : null}
            <TextField
              variant="filled"
              label="Email"
              color="primary"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <Box display="flex" justifyContent="flex-end" mt={3}>
              <CustomCancelButton
                onClick={handleReset}
                sx={{ backgroundColor: " #1F4700" }}
              />
              <Button
                component={Link}
                to="/users"
                variant="contained"
                color={
                  !isArmenianPhoneNumber ||
                  isZeroAfterPrefix ||
                  isMoreThan8Digits
                    ? "error"
                    : "primary"
                }
                sx={{
                  marginLeft: "10px",
                  backgroundColor: "#1F4700",
                  color: "white",
                }}
                disabled={
                  !isArmenianPhoneNumber ||
                  isZeroAfterPrefix ||
                  isMoreThan8Digits
                }
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
