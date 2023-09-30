//client//pages/owner/DeviceList.js
import React, { useState, useEffect } from "react";
import axios from 'axios';
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
import { RichTextInput } from 'ra-input-rich-text';
import { HomeRedirectButton } from "../../components/HomeRedirectButton";
import customDataProvider from "../../providers/dataProvider";
import { API_URL } from "../../consts";
export const GreenhouseCreate = (props) => {
  const currentDate= new Date();
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
  const validateMeasurement =[required()];
  const handleSave = async (values) => {
    try {
  const greenhouseData = {
    name: values.name,
    size: values.size,
    measurement: values.measurement,
    description: values.description,
    location: values.location,
    created_at: values.created_at.toISOString(),
  };

  const response = await customDataProvider.create("greenhouses/create", {
    data: greenhouseData,
  });
  
  if (response.status === 200) {
    notify("Greenhouse created successfully", "info");
    redirect("/greenhouses");
  } else if (response.status === 400) {
    const Error = await response.json();
    const message=Error.message
    if (message) {
      notify(message, { type: 'error' });
    } else {
      notify('An error occurred', { type: 'error' });
    }
  } else {
    notify('An error occurred', { type: 'error' });
  }
} catch (error) {
  console.error("Error creating greenhouse:", error);
}
  };
  return (
    <>
      <Create
        title="Create a greenhouse"
        {...props}
        
      >
        <SimpleForm onSubmit={handleSave}>
          <TextInput source="name" validate={validateGreenhouseName} />
          <NumberInput source="size" validate={validateGreenhouseSize}/>
          <SelectInput
            choices={measurementChoices.map(choice => ({
              id: choice.id,
              name: choice.value
            }))} source="measurement" label="Measurement" validate={validateMeasurement}
          />
          <TextInput source="location" validate={validateLocation}/>
          <RichTextInput source="description" />
          <DateInput source="created_at" defaultValue={currentDate} disabled />
        </SimpleForm>
      </Create>
      <HomeRedirectButton pageName="ownerPage" title="Home" />
    </>
  );
};
