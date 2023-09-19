// ResetFilters.js

import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useResourceContext } from "react-admin";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme"; 

export const ResetFilters = () => {
  const resource = useResourceContext();
  return (
    <ThemeProvider theme={Theme}>
      <Button
        sx={{ color: "#38A505" }}
        component={Link}
        to={{
          pathname: `/${resource}`,
          search: "filter={}&displayedFilters={}",
        }}
      >
        Reset filters
      </Button>
    </ThemeProvider>
  );
};
