import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  NumberInput,
  useDataProvider,
  required,
} from "react-admin";

import customDataProvider from "../../providers/dataProvider";
export const PortableDeviceEdit = (props) => {
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
        <SimpleForm>
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