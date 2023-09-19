// SaveButton.js

import React from "react";
import { Button, useRedirect } from "react-admin";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme"; 

export const SaveButton = () => {
  const redirect = useRedirect();

  const handleClick = () => {
    redirect("/Dashboard");
  };

  return (
    <ThemeProvider theme={Theme}>
      <Button
        variant="contained"
        sx={{
          width: "100px",
          height: "50px",
          background: "#1F4700",
        }}
        onClick={handleClick}
      >
        Save
      </Button>
    </ThemeProvider>
  );
};
