//client//pages/owner/GreenhouseList.js
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
  SearchInput,
  DatagridConfigurable,
  
} from "react-admin";
import { RichTextField } from "react-admin";
import { useState, useEffect } from "react";
import { HomeRedirectButton } from "../../components/HomeRedirectButton";
import { ResetFilters } from "../../components/ResetFilters";
import customDataProvider from "../../providers/dataProvider";

export const GreenhouseList = (props) => {
  const dataProvider = customDataProvider;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchSize, setSearchSize] = useState("");
  const [searchMeasurement, setSearchMeasurement] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const fetchData = async () => {
    try {
      const response = await dataProvider.getList("greenhouses", {
        pagination: { page: 1, perPage: 5 },
        sort: { field: "id", order: "ASC" },
        filter: {
          q: searchTerm,
          greenhouse_name: searchName,
          greenhouse_size: searchSize,
          greenhouse_size_measurement: searchMeasurement,
          greenhouse_description: searchDescription,
          greenhouse_location: searchLocation,
          created_at: searchDate,
        },
      });
      console.log("REQUEST SEND  ");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const GreenhouseFilter = (props) => (
    <Filter {...props}>
      <SearchInput source="q" alwaysOn onChange={handleSearchInputChange} />
      <TextInput
        label="Name"
        source="greenhouse_name"
        onChange={handleSearchNameChange}
      />
      <NumberInput
        label="Size"
        source="greenhouse_size"
        onChange={handleSearchSizeChange}
      />
      <TextInput
        label="Measurement"
        source="greenhouse_size_measurement"
        onChange={handleSearchMeasurementChange}
      />
      <TextInput
        label="Description"
        source="greenhouse_description"
        onChange={handleSearchDescriptionChange}
      />
      <TextInput
        label="Location"
        source="greenhouse_location"
        onChange={handleSearchLocationChange}
      />
      <DateInput
        label="Date"
        source="created_at"
        onChange={handleSearchDateChange}
      />
    </Filter>
  );
  useEffect(() => {
    console.log("Accepted Data: ", data);
  }, [data]);
  useEffect(() => {
    fetchData();
  }, [
    searchTerm,
    searchName,
    searchSize,
    searchMeasurement,
    searchDescription,
    searchDate,
  ]);
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
      <List {...props} filters={<GreenhouseFilter />} sx={{ color: "#38A505" }}>
      <DatagridConfigurable rowClick="edit">
          <TextField source="greenhouse_name" label="Name" />
          <NumberField source="greenhouse_size" label="Size" />
          <TextField source="measurement" label="Measurement" />
          <RichTextField source="greenhouse_description" label="Description"/>
          <TextField source="greenhouse_location" label="Location"/>
          <DateField source="created_at" label="Date" />
          <EditButton />
          <DeleteButton />
          </DatagridConfigurable>
      </List>
    </>
  );
};
