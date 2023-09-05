import React from "react";
import { Button, useRedirect } from "react-admin";
import { Typography } from "@mui/material";
import authPovider from "../providers/authPovider";

export const LogoutButton = () => {
  const redirect = useRedirect();
  const handleClick = () => {
    authPovider.logout({});
  };
  return (
    <Button onClick={handleClick}>
      <Typography color="#1F4700">Logout</Typography>
    </Button>
  );
};
