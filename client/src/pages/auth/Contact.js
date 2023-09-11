import React from "react";
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
const community = [
  {
    value: "Community1",
    label: "Community1",
  },
  {
    value: "Community2",
    label: "Community2",
  },
];
export const Contact = () => {
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
          >
            {community.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Phone number"
            variant="filled"
            color="primary"
            placeholder="+374 XXXXXXXX"
            sx={{ width: "100%", mb: 3 }}
          />
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <SaveButton />
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};
