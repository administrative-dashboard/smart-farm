//client//pages/owner/GreenhouseList.js
import React from "react";
import {
  NumberInput,
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  DeleteButton,
  TextInput,
} from "react-admin";
import { HomeRedirectButton } from "../../components/HomeRedirectButton";
import { ResetFilters } from "../../components/ResetFilters";

const fieldFilter = [
  <TextInput label="Search" source="q" alwaysOn />,
  <TextInput label="name" source="name" />,
  <NumberInput label="size" source="type" />,
  <TextInput label="description" source="description" />,
  <TextInput label="location" source="location" />,
];

export const FieldList = (props) => {
  return (
    <>
      <ResetFilters />
      <List {...props} filters={fieldFilter} sx={{ color: "#38A505" }}>
        <Datagrid>
          <TextField source="name" />
          <NumberField source="size" />
          <TextField source="description" />
          <TextField source="location" />
          <EditButton basePath="/fields" />
          <DeleteButton basePath="/fields" />
        </Datagrid>
      </List>
      <HomeRedirectButton pageName="ownerPage" title="Home" />
    </>
  );
};
