import React from "react";
import { Button, useRedirect } from "react-admin";
import { Typography } from "@mui/material";
import { authProvider } from "../providers/authPovider";

export const LogoutButton = () => {
  const redirect = useRedirect();
  const handleClick = () => {
    authProvider.logout({});
  };
  return (
    <Button onClick={handleClick}>
      <Typography color="#1F4700">Logout</Typography>
    </Button>
  );
};
