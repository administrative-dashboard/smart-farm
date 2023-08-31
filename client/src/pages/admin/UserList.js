//FixedDeviceListAdm.js
import React from "react";
import { List, Datagrid, TextField, TextInput, ShowButton } from "react-admin";
import { ResetFilters } from "../../components/ResetFilters";

export const UserListAdm = (props) => {
  return (
    <>
      <ResetFilters />
      <List
        {...props}
        filters={[
          <TextInput label="Search" source="q" alwaysOn />,
          <TextInput label="name" source="name" />,
          <TextInput label="community" source="community" />,
          <TextInput label="phone" source="phone" />,
          <TextInput label="email" source="email" />,
        ]}
      >
        <Datagrid>
          <TextField source="name" label="name" />
          <TextField source="community" label="community" />
          <TextField source="phone" label="phone" />
          <TextField source="email" label="email" />
          <ShowButton basePath="/User" label="Show" />
        </Datagrid>
      </List>
    </>
  );
};
