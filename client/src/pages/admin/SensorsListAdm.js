import React from "react";
import { List, Datagrid, TextField, TextInput, ShowButton } from "react-admin";
import { ResetFilters } from "../../components/ResetFilters";

export const SensorsListAdm = (props) => {
  return (
    <>
      <ResetFilters />
      <List
        {...props}
        filters={[
          <TextInput label="Search" source="q" alwaysOn />,
          <TextInput label="Owner" source="Owner" />,
          <TextInput label="Type" source="Type" />,
          <TextInput label="Model" source="Model" />,
          <TextInput label="Status" source="Status" />,
        ]}
      >
        <Datagrid>
          <TextField source="Owner" label="Owner" />
          <TextField source="Type" label="Type" />
          <TextInput label="Model" source="Model" />
          <TextField source="Status" label="Status" />
          <ShowButton basePath="/all_sensors" label="Show" />
        </Datagrid>
      </List>
    </>
  );
};
