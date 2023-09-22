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
export const FixedDeviceCreate = (props) => {
  
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
        name: values.device_name,
        type: values.device_type,
        quantity: values.quantity,
        created_at: values.created_at.toISOString(),
      };
      
      const response = await customDataProvider.create("fixed_devices/create", {
        data: deviceData,
      });
      
      if (response.data) {
        notify("Device created successfully", "info");
        redirect("/fixed_devices");
      } else {
        console.error("Device creation failed:", response.error);
        
      }
    } catch (error) {
      console.error("Error creating device:", error);
      notify('Device already is existing', { type: 'error' });
    }
  };
  
  return (
    <>
      <Create
        title="Create a fixed device"
        {...props}
        // save={handleSave}
      >
        <SimpleForm onSubmit={handleSave}>
          <TextInput source="device_name" validate={validateDeviceName} />
          <TextInput source="device_type" validate={validateDeviceType} />
          <NumberInput source="quantity" validate={validateQuantity} />
          <DateInput source="created_at" defaultValue={currentDate} disabled />
        </SimpleForm>
      </Create>
      
    </>
  );
};
