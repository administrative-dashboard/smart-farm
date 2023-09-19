// BasicTable.js

import React from "react";
import { List, Datagrid, TextField, TextInput, ShowButton } from "react-admin";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme"; // Import the shared theme
import { ResetFilters } from "./ResetFilters";

export const BasicTable = (props) => {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <ResetFilters />
        <List
          {...props}
          filters={[
            <TextInput label="Search" source="q" alwaysOn />,
            <TextInput label="Name" source="name" />,
            <TextInput label="Owner" source="owner" />,
            <TextInput label="Size" source="size" />,
            <TextInput label="Description" source="description" />,
            <TextInput label="Location" source="location" />,
          ]}
        >
          <Datagrid>
            <TextField source="name" label="Greenhouse" />
            <TextField source="owner" label="Owner" />
            <TextField source="size" label="Size" />
            <TextField source="description" label="Description" />
            <TextField source="location" label="Location" />
            <ShowButton basePath="/BasicTable" label="Show" />
          </Datagrid>
        </List>
      </>
    </ThemeProvider>
  );
};
