import React from "react";
import { Button } from "react-admin";
import { Typography } from "@mui/material";
import { authProvider } from "../providers/authPovider";
export const LogoutButton = () => {
  const handleClick = () => {
    authProvider.logout(); // Remove the empty object argument
  };
  return (
    <Button onClick={handleClick}>
      <Typography color="#1F4700">Logout</Typography>
    </Button>
  );
};