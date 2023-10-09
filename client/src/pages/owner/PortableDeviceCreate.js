import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  useNotify,
  useRedirect,
  required,
  Toolbar,
  SaveButton,
  Button,
} from "react-admin";
import customDataProvider from "../../providers/dataProvider";

export const PortableDeviceCreate = (props) => {
  const currentDate = new Date();
  const notify = useNotify();
  const redirect = useRedirect();
  // const [quantity, setQuantity] = useState("");
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
      const response = await customDataProvider.create(
        "portable_devices/create",
        {
          data: deviceData,
        }
      );

      if (response.status === 200) {
        notify("Device created successfully", "info");
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
      console.error("Error creating device:", error);
    }
  };
  const handleCancel = () => {
    redirect("/portable_devices");
  };

  return (
    <>
      <Create title="Create a portable device" {...props}>
        <SimpleForm
          onSubmit={handleSave}
          toolbar={
            <Toolbar>
              <SaveButton label="Save" submitOnEnter={true} sx={{ mr: '90%' }} />
              <Button label="Cancel" onClick={handleCancel} />
            </Toolbar>
          }
        >
          <TextInput source="name" validate={validateDeviceName} />
          <TextInput source="type" validate={validateDeviceType} />
          <NumberInput source="quantity" validate={validateQuantity} />
          <NumberInput
            source="shared_quantity"
            validate={validateSharedQuantity}
            //minValue={quantity}
          />
          <DateInput source="created_at" defaultValue={currentDate} disabled />
        </SimpleForm>
      </Create>
    </>
  );
};
