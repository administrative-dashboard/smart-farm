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
      <Edit title="Edit a portable device" {...props} resource="portable_devices">
        <SimpleForm>
          {/* <NumberInput source="id" disable /> */}
          <TextInput source="name" />
          <TextInput source="type" />
          <TextInput source="description" />
          <NumberInput source="quantity" />
          <DateInput source="date" />
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
