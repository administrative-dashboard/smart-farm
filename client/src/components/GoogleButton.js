import React, { useState } from "react";
import { Button } from "react-admin";
import { useMediaQuery, useTheme } from "@mui/material";
import googleLogo from "../assets/static/googleLogo.svg";
import { authProvider } from "../providers/authPovider";

export const GoogleButton = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    authProvider.login();
  };

  return (
    <Button
      onClick={handleLogin}
      disabled={loading}
      variant="outlined"
      sx={{
        color: "#38A505",
        border: "1px solid #36D446",
        px: isMediumScreen ? 4 : 2,
        py: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={googleLogo}
        alt="Google Logo"
        style={{
          width: "24px",
          height: "24px",
          marginRight: isMediumScreen ? "8px" : "4px",
        }}
      />
      {isMediumScreen && "Continue with Google"}
    </Button>
  );
};
