//client//pages/owner/DeviceList.js
import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  NumberInput,
  required,
  minValue,
} from "react-admin";
import { Box } from "@mui/material";

import { HomeRedirectButton } from "../../components/HomeRedirectButton";

export const FixedDeviceEdit = (props) => {
  return (
    <>
      <Edit title="Edit a fixed device" {...props} resource="fixed_devices">
        <SimpleForm>
          {/* <NumberInput source="id" disable /> */}
          <TextInput source="device_name" validate={[required()]}/>
          <TextInput source="device_type" validate={[required()]}/>
          <NumberInput source="quantity" validate={[required(), minValue(1, "Quantity must be positive.")]}/>
          <DateInput source="created_at" label="Date" disabled/>
        </SimpleForm>
      </Edit>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <HomeRedirectButton pageName="devices" title="Devices" />
        <HomeRedirectButton pageName="ownerPage" title="Home" />
      </Box>
    </>
  );
};
