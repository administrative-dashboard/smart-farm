// HomeRedirectButton.js
import React from "react";
import { Button, useRedirect } from "react-admin";
import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme";

export const HomeRedirectButton = ({ pageName, title }) => {
  const redirect = useRedirect();

  const handleHomeButtonClick = () => {
    redirect(`/${pageName}`);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Button
        variant="outlined"
        sx={{
          color: "#38A505",
          border: "1px solid #36D446",
          px: 4,
          py: 1,
          alignItems: "center",
          m: "auto",
          "&:hover": {
            border: "lightgreen",
          },
        }}
        onClick={handleHomeButtonClick}
      >
        <Typography variant="h6">{title}</Typography>
      </Button>
    </ThemeProvider>
  );
};
