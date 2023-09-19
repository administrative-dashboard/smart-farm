// SigninButton.js

import React from "react";
import { Button, useRedirect } from "react-admin";
import { useMediaQuery, useTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme"; 

export const SigninButton = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const redirect = useRedirect();
  const handleClick = () => {
    redirect("/signin");
  };

  return (
    <ThemeProvider theme={Theme}>
      <Button
        variant={isMediumScreen ? "contained" : "text"}
        sx={{
          backgroundColor: "#1F4700",
          color: "white",
          mr: 5,
          px: isMediumScreen ? 4 : 2,
          "&:hover": {
            backgroundColor: "lightgreen",
          },
        }}
        onClick={handleClick}
      >
        Signin
      </Button>
    </ThemeProvider>
  );
};
