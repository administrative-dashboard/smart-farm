//client//pages/owner/DeviceList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  useNotify,
  useRedirect,
  required,
  SelectField,
  choices,
  SelectInput,
} from "react-admin";
//import { HomeRedirectButton } from "../../components/HomeRedirectButton";
import customDataProvider from "../../providers/dataProvider";
import { API_URL } from "../../consts";
export const FieldCreate = (props) => {
  const currentDate = new Date();
  const notify = useNotify();
  const redirect = useRedirect();

  const [measurementChoices, setMeasurementChoices] = useState([]); // State to store measurement choices

  useEffect(() => {
    axios
      .get(`${API_URL}/measurement_units/fields`)
      .then((response) => {
        console.log(response.data);
        setMeasurementChoices(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching measurement choices:", error);
      });
  }, []);

  const validatePositiveNumber = (value) => {
    if (isNaN(value) || value <= 0) {
      return "Value must be a positive number";
    }
    return undefined;
  };

  const validateFieldName = [required()];
  const validateFieldSize = [required(), validatePositiveNumber];
  const validateLocation = [required()];

  const handleSave = async (values) => {
    try {
      const fieldData = {
        name: values.name,
        size: values.size,
        measurement: values.measurement,
        description: values.description,
        location: values.location,
        created_at: values.created_at.toISOString(),
      };

      const response = await customDataProvider.create("fields/create", {
        data: fieldData,
      });

      if (response.status === 200) {
        notify("Field created successfully", "info");
        redirect("/fields");
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
      console.error("Error creating field:", error);
    }
  };
  return (
    <>
      <Create title="Create a field" {...props}>
        <SimpleForm onSubmit={handleSave}>
          <TextInput source="name" validate={validateFieldName} />
          <NumberInput source="size" validate={validateFieldSize} />
          <SelectInput
            choices={measurementChoices.map((choice) => ({
              id: choice.id,
              name: choice.value,
            }))}
            source="measurement"
            label="Measurement"
          />
          <TextInput source="location" validate={validateLocation} />
          <TextInput source="description" multiline />
          <DateInput source="created_at" defaultValue={currentDate} disabled />
        </SimpleForm>
      </Create>
      {/* <HomeRedirectButton pageName="ownerPage" title="Home" /> */}
    </>
  );
};
