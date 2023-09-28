import React from "react";
import {
  DateField,
  List,
  Datagrid,
  TextField,
  NumberField,
  NumberInput,
  DateInput,
  EditButton,
  DeleteButton,
  TextInput,
  Filter,
  SearchInput
} from "react-admin";
import { HomeRedirectButton } from "../../components/HomeRedirectButton";
import { ResetFilters } from "../../components/ResetFilters";
import { useState, useEffect } from "react";
import customDataProvider from "../../providers/dataProvider";
export const FieldList = (props) => {
  const dataProvider = customDataProvider;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchSize, setSearchSize] = useState("");
  const [searchMeasurement, setSearchMeasurement] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate,setSearchDate]= useState("");
  const fetchData = async () => {
    try {
      const response = await dataProvider.getList("fields", {
        pagination: { page: 1, perPage: 5 },
        sort: { field: "id", order: "ASC" },
        filter: {
           q: searchTerm,
           field_name: searchName,
           field_size: searchSize,
           field_size_measurement: searchMeasurement,
           field_description: searchDescription,
           field_location: searchLocation,
           created_at: searchDate,
        },
      });
      console.log("REQUEST SEND  ");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const FieldFilter = (props) => (
    <Filter {...props}>
      <SearchInput source="q" alwaysOn onChange={handleSearchInputChange} />
      <TextInput label="Name" source="field_name" onChange={handleSearchNameChange} />
      <NumberInput label="Size" source="field_size" onChange={handleSearchSizeChange}/>
      <TextInput label="Measurement" source="field_size_measurement" onChange={handleSearchMeasurementChange}/>
      <TextInput label="Description" source="field_description" onChange={handleSearchDescriptionChange} multiline/>
      <TextInput label="Location" source="field_location" onChange={handleSearchLocationChange}/>
      <DateInput label="Date" source="created_at" onChange={handleSearchDateChange}/>
    </Filter>
  );
  useEffect(() => {
    console.log("Accepted Data: ", data);
  }, [data]);
  useEffect(() => {
    fetchData();
  }, [searchTerm,searchName,searchSize,searchMeasurement,searchDescription,searchDate]);
  const handleSearchInputChange = async (e) => {
    // console.log("Event object:", e);
    if (e.target && e.target.value) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSearchTerm(e.target.value);
    } else {
      console.error("Event or event target is undefined.");
    }
  };
  const handleSearchNameChange = async (e) => {
    if (e.target.value) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSearchName(e.target.value);
      console.log(searchName);
    }
  };
  const handleSearchSizeChange = async (e) => {
    if (e.target.value) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSearchSize(e.target.value);
    }
  };
  const handleSearchMeasurementChange = async (e) => {
    if (e.target.value) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSearchMeasurement(e.target.value);
    }
  };
  const handleSearchDescriptionChange = async (e) => {
    if (e.target.value) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSearchDescription(e.target.value);
    }
  };
  const handleSearchLocationChange = async (e) => {
    if (e.target.value) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSearchLocation(e.target.value);
    }
  };
  const handleSearchDateChange = async (e) => {
    if (e.target.value) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSearchDate(e.target.value);
    }
  };
  return (
    <>
      <ResetFilters />
      <List {...props} data={data} filters={<FieldFilter/>} sx={{ color: "#38A505" }}>
        <Datagrid rowClick="edit">
          <TextField source="field_name" label="Name"/>
          <NumberField source="field_size" label="Size" />
          <TextField source="measurement" label="Measurement"/>
          <TextField source="field_description" label="Description" multiline fullWidth/>
          <TextField source="field_location" label="Location" />
          <DateField source="created_at" label="Date" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      </List>
    </>
  );
};