//client//pages/owner/DeviceList.js
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Edit,
  SimpleForm,
  TextInput,
  DateInput,
  NumberInput,
  required,
  useNotify,
  useRedirect,
  SelectInput, } from "react-admin";
import { HomeRedirectButton } from "../../components/HomeRedirectButton";
import { RichTextInput } from 'ra-input-rich-text';
import { API_URL } from "../../consts";
import customDataProvider from "../../providers/dataProvider";
export const GreenhouseEdit = (props) => {
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
  const validateGreenhouseName = [required()];
  const validateGreenhouseSize = [required(), validatePositiveNumber];
  const validateLocation =[required()];
  const validateMeasurement=[required()];

  const handleSave = async (values) => {
    try {
      
      const greenhouseData = {
        id: values.id,
        name: values.greenhouse_name,
        size: values.greenhouse_size,
        measurement: values.measurement,
        description: values.greenhouse_description,
        location: values.greenhouse_location,
        created_at: values.created_at,
      };
      console.log(greenhouseData.id)
      const response = await customDataProvider.update("greenhouses", {
        data: greenhouseData,
        id: greenhouseData.id
      });
      console.log(response)
      if (response.status === 200) {
        notify("Greenhouse updated successfully", "info");
        redirect("/greenhouses");
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
      console.error("Error updating greenhouse:", error);
    }
  };
  return (
    <>
      <Edit title="Edit a greenhouse" {...props} resource="greenhouses">
        <SimpleForm onSubmit={handleSave}>
          <TextInput source="greenhouse_name" validate={validateGreenhouseName}/>
          <NumberInput source="greenhouse_size" validate={validateGreenhouseSize}/>
          <SelectInput
            choices={measurementChoices.map(choice => ({
              id: choice.id,
              name: choice.value
            }))} source="measurement" label="Measurement" validate={validateMeasurement}
          />
          <TextInput source="greenhouse_location" validate={validateLocation}/>
          <RichTextInput source="greenhouse_description" />
          <DateInput source="created_at" disabled />
        </SimpleForm>
      </Edit>
    </>
  );
};
