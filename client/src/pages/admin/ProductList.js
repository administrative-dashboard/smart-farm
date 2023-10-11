//FixedDeviceListAdm.js
import React from "react";
import { List, Datagrid, TextField, TextInput, ShowButton } from "react-admin";
import { ResetFilters } from "../../components/ResetFilters";

export const ProductListAdm = (props) => {
  return (
    <>
      <ResetFilters />
      <List
        {...props}
        filters={[
          <TextInput label="Search" source="q" alwaysOn />,
          <TextInput label="name" source="name" />,
          <TextInput label="size" source="type" />,
          <TextInput label="description" source="description" />,
          <TextInput label="location" source="location" />,
        ]}
      >
        <Datagrid>
          <TextField source="name" label="Greenhouse" />
          <TextField source="size" label="Size" />
          <TextField source="description" label="Description" />
          <TextField source="location" label="Location" />
          <ShowButton basePath="/Product" label="Show" />
        </Datagrid>
      </List>
    </>
  );
};
