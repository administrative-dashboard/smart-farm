// CancelButton.js

import React from "react";
import { Button, Toolbar, useRedirect } from "react-admin";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme"; // Import the shared theme

export const CustomCancelButton = () => {
  const redirect = useRedirect();

  const handleClick = () => {
    redirect("/posts");
  };

  return (
    <ThemeProvider theme={Theme}>
      <Button label="Cancel" onClick={handleClick} />
    </ThemeProvider>
  );
};
