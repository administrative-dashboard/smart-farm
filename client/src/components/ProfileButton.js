import React from "react";
import { Button, useRedirect } from "react-admin";
import { Typography } from "@mui/material";

export const ProfileButton = () => {
  const redirect = useRedirect();
  const handleClick = () => {
    redirect("/profile");
  };
  return (
    <Button onClick={handleClick}>
      <Typography color="#1F4700">Profile</Typography>
    </Button>
  );
};
