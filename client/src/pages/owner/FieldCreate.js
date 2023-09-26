//client//pages/owner/DeviceList.js
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
  SelectField,
} from "react-admin";
//import { HomeRedirectButton } from "../../components/HomeRedirectButton";
import customDataProvider from "../../providers/dataProvider";
import { API_URL } from "../../consts";
export const FieldCreate = (props) => {
  const currentDate= new Date();
  const notify = useNotify();
  const redirect = useRedirect();

  const [measurementChoices, setMeasurementChoices] = useState([]); // State to store measurement choices

 /*  useEffect(() => {
    axios.get(`${API_URL}/fields/measurements`)
      .then(response => {
        setMeasurementChoices(response.data);
      })
      .catch(error => {
        console.error("Error fetching measurement choices:", error);
      });
  }, []);  */
  
  const validatePositiveNumber = (value) => {
    if (isNaN(value) || value <= 0) {
      return "Value must be a positive number";
    }
    return undefined;
  };

  const validateFieldName = [required()];
  const validateFieldSize = [required()];
  const validateLocation =[required()];
 
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
      
      // Make a POST request to create the device
      const response = await customDataProvider.create("fields/create", {
        data: fieldData,
      });
      
      if (response.ok) {
        notify("Field created successfully", "info");
        redirect("/fields");
      } else {
        console.error("Field creation failed:", response.error);
      }
    } catch (error) {
      console.error("Error creating field:", error);
      notify('Field already is existing', { type: 'error' });
    }
  };
  return (
    <>
      <Create 
        title="Create a field" 
        {...props} 
      >
        <SimpleForm onSubmit={handleSave}>
          <TextInput source="name" validate={validateFieldName}/>
          <NumberInput source="size" validate={validateFieldSize}/>
          <SelectField source = "measurement" choices={measurementChoices}/>
          <TextInput source="location" validate={validateLocation}/>
          <TextInput source="description" multiline/>
          <DateInput source="created_at" defaultValue={currentDate} disabled />
        </SimpleForm>
      </Create>
      {/* <HomeRedirectButton pageName="ownerPage" title="Home" /> */}
    </>
  ); 
};
