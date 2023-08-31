import React from "react";
import { List, Datagrid, TextField, TextInput, ShowButton } from "react-admin";
import { Box } from "@mui/material";
import { ResetFilters } from "../../components/ResetFilters";

export const PortableDeviceListAdm = (props) => {
  return (
    <>
      <ResetFilters />
      <List
        {...props}
        filters={[
          <TextInput label="Search" source="q" alwaysOn />,
          <TextInput label="Name" source="Device" />,
          <TextInput label="Owner" source="Owner" />,
          <TextInput label="Type" source="Type" />,
          <TextInput label="Status" source="Status" />,
        ]}
      >
        <Datagrid>
          <TextField source="Device" label="Device" />
          <TextField source="Owner" label="Owner" />
          <TextField source="Type" label="Type" />
          <TextField source="Status" label="Status" />
          <ShowButton basePath="/all_portableDevices" label="Show" />
        </Datagrid>
      </List>
    </>
  );
};

