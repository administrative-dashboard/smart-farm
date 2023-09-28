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
} from "react-admin";
import { API_URL } from "../../consts";
export const FieldEdit = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const [measurementChoices, setMeasurementChoices] = useState([]); 

  useEffect(() => {
    axios.get(`${API_URL}/measurement_units/fields`)
      .then(response => {
        console.log(response.data);
        setMeasurementChoices(response.data);
        console.log(response.data)
      })
      .catch(error => {
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
  const validateLocation =[required()];
  return (
    <>
      <Edit title="Edit a field" {...props} resource="fields">
      <SimpleForm>
          <TextInput source="field_name" validate={validateFieldName}/>
          <NumberInput source="field_size" validate={validateFieldSize}/>
          <SelectInput
            choices={measurementChoices.map(choice => ({
              id: choice.id,
              name: choice.value
            }))} source="measurement" label="Measurement"
          />
          <TextInput source="field_location" validate={validateLocation}/>
          <TextInput source="field_description" multiline fullWidth/>
          <DateInput source="created_at" disabled />
        </SimpleForm>
      </Edit>

    </>
  );
};
