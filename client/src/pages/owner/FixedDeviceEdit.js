import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  NumberInput,
  useNotify,
  useRedirect,
  required,
  minValue,
  Toolbar,
  SaveButton,
  Button,
  DeleteButton,
} from "react-admin";
import customDataProvider from "../../providers/dataProvider";

export const FixedDeviceEdit = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const handleSave = async (values) => {
    try {
      const deviceData = {
        id: values.id,
        device_name: values.device_name,
        device_type: values.device_type,
        quantity: values.quantity,
        created_at: values.created_at,
      };
      console.log(deviceData.id);
      const response = await customDataProvider.update("fixed_devices", {
        data: deviceData,
        id: deviceData.id,
      });
      console.log(response);
      if (response.status === 200) {
        notify("Fixed device updated successfully", "info");
        redirect("/fixed_devices");
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
      console.error("Error updating fixed device:", error);
    }
  };
  const handleCancel = () => {
    redirect("/fixed_devices");
  };
  return (
    <>
      <Edit title="Edit a fixed device" {...props} resource="fixed_devices">
        <SimpleForm
          onSubmit={handleSave}
          toolbar={
            <Toolbar>
              <SaveButton
                label="Save"
                submitOnEnter={true}
                sx={{ mr: "80%" }}
              />

              <Button label="Cancel" onClick={handleCancel} sx={{ mr: "3%" }} />
              <DeleteButton />
            </Toolbar>
          }
        >
          <TextInput source="device_name" validate={[required()]} />
          <TextInput source="device_type" validate={[required()]} />
          <NumberInput
            source="quantity"
            validate={[required(), minValue(1, "Quantity must be positive.")]}
          />
          <DateInput source="created_at" label="Date" disabled />
        </SimpleForm>
      </Edit>
    </>
  );
};
