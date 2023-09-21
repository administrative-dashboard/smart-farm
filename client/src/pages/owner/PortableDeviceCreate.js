import React, { useState, useEffect } from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  useNotify,
  useRedirect,
  required,
} from "react-admin";
import customDataProvider from "../../providers/dataProvider";

import { HomeRedirectButton } from "../../components/HomeRedirectButton";
export const PortableDeviceCreate = (props) => {
  
  const currentDate = new Date();
  const notify = useNotify();
  const redirect = useRedirect();
  const [quantity, setQuantity] = useState("");
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
  const validateDeviceName = [required()];
  const validateDeviceType = [required()];
  const validateQuantity = [required(), validatePositiveNumber];
  const validateSharedQuantity = [
    required(),
    validatePositiveNumber,
    validationSharedQuantity,
  ];
  const handleSave = async (values) => {
    try {
      const deviceData = {
        name: values.name,
        type: values.type,
        quantity: values.quantity,
        shared_quantity: values.shared_quantity,
        created_at: values.created_at.toISOString(),
      };
      
      // Make a POST request to create the device
      const response = await customDataProvider.create("portable_devices", {
        data: deviceData,
      });
      
      if (response.data) {
        notify("Device created successfully", "info");
        redirect("/portable_devices");
      } else {
        // Handle the case where the creation was not successful
        console.error("Device creation failed:", response.error);
      }
    } catch (error) {
      console.error("Error creating device:", error);
    }
  };
  
  return (
    <>
      <Create
        title="Create a portable device"
        {...props}
        save={handleSave}
      >
        <SimpleForm onSubmit={handleSave}>
          <TextInput source="name" validate={validateDeviceName} />
          <TextInput source="type" validate={validateDeviceType} />
          <NumberInput source="quantity" validate={validateQuantity} />
          <NumberInput
            source="shared_quantity"
            validate={validateSharedQuantity}
            minValue={quantity}
          />
          <DateInput source="created_at" defaultValue={currentDate} disabled />
        </SimpleForm>
      </Create>
      
    </>
  );
};
