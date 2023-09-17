import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  useNotify,
  useRedirect, // Import the hooks here
  useDataProvider,
} from "react-admin";
import customDataProvider from "../../providers/dataProvider";
import { HomeRedirectButton } from "../../components/HomeRedirectButton";

export const PortableDeviceCreate = (props) => {
  
  const currentDate = new Date();
  const notify = useNotify(); 
  const redirect = useRedirect(); 

  const handleSave = async (values) => {
    try {
      const deviceData = {
        name: values.name,
        type: values.type,
        quantity: values.quantity,
        shared_quantity: values.shared_quantity,
        created_at: values.created_at.toISOString(),
      };
      console.log("aaaaaaaaaaaaaaaa");

      

      // Notify the user of a successful creation
      notify("Device created successfully", "info");

      // Redirect to the devices list page after creation
      redirect("/portable_devices");
    } catch (error) {
      console.log(">>>>>>>", error);
      console.error("Error creating device:", error);
    }
  };

  return (
    <>
      <Create resource="portable_devices/create"
        title="Create a portable device"
        {...props}
        save={handleSave} 
      >
        <SimpleForm>
          <TextInput source="name" />
          <TextInput source="type" />
          <NumberInput source="quantity" />
          <NumberInput source="shared_quantity" />
          <DateInput source="created_at" defaultValue={currentDate} disabled />
        </SimpleForm>
      </Create>
      <HomeRedirectButton pageName="devices" title="Devices" />
      <HomeRedirectButton pageName="ownerPage" title="Home" />
    </>
  );
};
