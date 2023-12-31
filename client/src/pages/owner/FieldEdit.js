import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  NumberInput,
  required,
  useNotify,
  useRedirect,
  SelectInput,
  Toolbar,
  SaveButton,
  Button,
  DeleteButton,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";
import customDataProvider from "../../providers/dataProvider";
const API_URL=process.env.REACT_APP_API_URL;
export const FieldEdit = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [measurementChoices, setMeasurementChoices] = useState([]);


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
        id: values.id,
        name: values.field_name,
        size: values.field_size,
        measurement: values.measurement,
        description: values.field_description,
        location: values.field_location,
        created_at: values.created_at,
      };
      console.log(fieldData.id);
      const response = await customDataProvider.update("fields", {
        data: fieldData,
        id: fieldData.id,
      });
      console.log(response);
      if (response.status === 200) {
        notify("Field updated successfully", "info");
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
      console.error("Error updating field:", error);
    }
  };

  const handleCancel = () => {
    redirect("/fields");
  };

  return (
    <>
      <Edit title="Edit a field" {...props} resource="fields">
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
          <TextInput source="field_name" validate={validateFieldName} />
          <NumberInput source="field_size" validate={validateFieldSize} />
          <SelectInput
            choices={measurementChoices.map((choice) => ({
              id: choice.id,
              name: choice.value,
            }))}
            source="measurement"
            label="Measurement"
          />
          <TextInput source="field_location" validate={validateLocation} />
          <RichTextInput source="field_description" />
          <DateInput source="created_at" disabled />
        </SimpleForm>
      </Edit>
    </>
  );
};
