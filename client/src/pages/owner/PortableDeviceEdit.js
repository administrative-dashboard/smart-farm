//client//pages/owner/DeviceList.js
import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  NumberInput,
} from "react-admin";
import { Box } from "@mui/material";

import { HomeRedirectButton } from "../../components/HomeRedirectButton";

export const PortableDeviceEdit = (props) => {
  return (
    <>
      <Edit 
        title="Edit a portable device" {...props}
        resource="portable_devices"
      >
        <SimpleForm>
          {/* <NumberInput source="id" disable /> */}
          <TextInput source="device_name" label="Name" />
          <TextInput source="device_type" label="Type" />
          <NumberInput source="quantity" label="Quantity" />
          <NumberInput source="shared_quantity" label="Shared Quantity" />
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
