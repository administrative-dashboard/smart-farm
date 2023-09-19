// BasicTableShow.js

import * as React from "react";
import { Show, SimpleShowLayout, TextField } from "react-admin";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme"; // Import the shared theme

export const BasicTableShow = (props) => (
  <ThemeProvider theme={Theme}>
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="name" label="Greenhouse" />
        <TextField source="owner" label="Owner" />
        <TextField source="size" label="Size" />
        <TextField source="description" label="Description" />
        <TextField source="location" label="Location" />
      </SimpleShowLayout>
    </Show>
  </ThemeProvider>
);
