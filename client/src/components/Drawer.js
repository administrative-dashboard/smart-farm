import * as React from "react";
import { Box, Drawer, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
export const MyBar = ({ drawerData }) => {
  const theme = createTheme();
  const [open, setOpen] = useState(false);
  const getList = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mt: 8,
      }}
      onClick={() => setOpen(false)}
    >
      {drawerData.map((item, index) => (
        <Button
          key={index}
          component="a"
          href={item.link}
          variant="contained"
          color="primary"
          sx={{
            background: "rgba(0, 41, 0, 1)",
            width: "75%",
            mt: 5,
            ml: 5,
            mr: 5,
            fontFamily: "Roboto",
            color: "white",
            "&:hover": {
              background: "rgba(0, 96, 0, 1)",
              textDecoration: "none",
            },
          }}
        >
          {item.name}
        </Button>
      ))}
    </Box>
  );
  return (
    <ThemeProvider theme={theme}>
      <Drawer
        variant="permanent"
        anchor={"left"}
        PaperProps={{
          sx: { backgroundColor: "rgba(0, 41, 0, 1)", color: "white", width: "13%" },
        }}
      >
        {getList()}
      </Drawer>
    </ThemeProvider>
  );
};


