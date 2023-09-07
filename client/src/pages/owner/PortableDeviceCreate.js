//client//pages/owner/DeviceList.js
import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  useNotify,
  useRedirect,
} from "react-admin";
import axios from "axios"; // Import Axios

import { HomeRedirectButton } from "../../components/HomeRedirectButton";

export const PortableDeviceCreate = (props) => {
  const currentDate = new Date();
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = (data) => {
    notify(`Device created successfully`);
    redirect("/portable_devices"); // Redirect to the portable devices list after successful creation
  };

  const handleSave = async (values) => {
    try {
      // Make a POST request to your NestJS API to create the device
      await axios.post("http://your-nestjs-api-url/portable_devices", values);
      onSuccess(); // Trigger onSuccess callback on success
    } catch (error) {
      console.error("Error creating device:", error);
      // Handle error notification or display an error message to the user
    }
  };

  return (
    <>
      <Create
        title="Create a portable device"
        {...props}
        save={handleSave} // Use the custom handleSave function
      >
        <SimpleForm>
          <TextInput source="name" />
          <TextInput source="type" />
          <TextInput source="description" />
          <NumberInput source="quantity" />
          <DateInput source="date" defaultValue={currentDate} disabled />
        </SimpleForm>
      </Create>
      <HomeRedirectButton pageName="devices" title="Devices" />
      <HomeRedirectButton pageName="ownerPage" title="Home" />
    </>
  );
};
