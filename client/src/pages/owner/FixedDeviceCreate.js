//client//pages/owner/DeviceList.js
import React from "react";
import {
  Create,
  DateInput,
  NumberInput,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
} from "react-admin";
import { Box } from "@mui/material";

import { HomeRedirectButton } from "../../components/HomeRedirectButton";

export const FixedDeviceCreate = (props) => {
  const currentDate = new Date();
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = (data) => {
    notify(`Changes saved`);
    redirect("/portable_devices");
  };

  // const saveWithOwner = async (values) => {
  //     const { name, type, description, quantity, date } = values;

  //     // Create the entry in fixed_devices
  //     const createdDevice = await axios.post('http://localhost:5000/fixed_devices', {
  //       name,
  //       type,
  //       description,
  //     });

  //     // Create the entry in owners_fixedDevices using the reference to the created fixed_device
  //     await axios.post('http://localhost:5000/owners_fixedDevices', {
  //       user_id: 1,
  //       fixed_device_id: createdDevice.data.id,
  //       quantity,
  //       measurement_id: 1,
  //       date,
  //     });

  //   };
  return (
    <>
      <Create
        title="Create a portable device"
        {...props}
        mutationOptions={{ onSuccess }}
      >
        <SimpleForm>
          {/* <SimpleForm save={saveWithOwner}> */}
          {/* <NumberInput source="id" disable/> */}
          <TextInput source="name" />
          <TextInput source="type" />
          <TextInput source="description" />
          <NumberInput source="quantity" />
          <DateInput
            source="date"
            showTime={true}
            defaultValue={currentDate}
            disabled
          />
        </SimpleForm>
      </Create>
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
