import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  NumberInput,
  useDataProvider,
  useNotify,
  useRedirect,
  required,
} from "react-admin";

import customDataProvider from "../../providers/dataProvider";
export const PortableDeviceEdit = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const handleSave = async (values) => {
    try {
      
      const deviceData = {
        id: values.id,
        device_name: values.device_name,
        device_type: values.device_type,
        quantity: values.quantity,
        shared_quantity: values.shared_quantity,
        created_at: values.created_at,
      };
      console.log(deviceData.id)
      const response = await customDataProvider.update("portable_devices", {
        data: deviceData,
        id: deviceData.id
      });
      console.log(response)
      if (response.status === 200) {
        notify("Portable device updated successfully", "info");
        redirect("/portable_devices");
      } else if (response.status === 400) {
        const Error = await response.json();
        const message = Error.message;
        if (message) {
          notify(message, { type: "error" });
        } else {
          notify("An error occurred", { type: "error" });
        }
      } else {
        notify("An error occurred", { type: "error" });
      }
    } catch (error) {
      console.error("Error updating portable device:", error);
    }
  };



  const validatePositiveNumber = (value) => {
    if (isNaN(value) || value <= 0) {
      return "Value must be a positive number";
    }
    return undefined;
  };
  const validationSharedQuantity = (value, allValues) => {
    if (value > allValues.quantity) {
      return "Shared quantity must be less than quantity";
    }
    return undefined;
  };
  return (
    <>
      <Edit
        title="Edit a portable device"
        {...props}
        resource="portable_devices"
      >
        <SimpleForm onSubmit={handleSave}>
          <TextInput source="device_name" label="Name" validate={required()} />
          <TextInput source="device_type" label="Type" validate={required()} />
          <NumberInput
            source="quantity"
            label="Quantity"
            validate={[required(), validatePositiveNumber]}
          />
          <NumberInput
            source="shared_quantity"
            label="Shared Quantity"
            validate={[validatePositiveNumber, validationSharedQuantity]}
          />
          <DateInput source="created_at" label="Date" disabled />
        </SimpleForm>
      </Edit>

    </>
  );
};