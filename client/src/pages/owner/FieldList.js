import React, { useState, useEffect } from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  DeleteButton,
  RichTextField,
  DateField,
} from "react-admin";
import customDataProvider from "../../providers/dataProvider";
import { TopToolbar, ExportButton, CreateButton } from "react-admin";
import { Box } from "@mui/material";
import { PostFilterButton } from "../../components/PostFilterButton";
import { PostFilterForm } from "../../components/PostFilterForm";

export const FieldList = (props) => {
  const dataProvider = customDataProvider;
  const [data, setData] = useState([]);
  const customFilters = [
    { source: "field_name", label: "Field Name" },
    { source: "field_size", label: "Field Size" },
    { source: "field_size_measurement", label: "Field Size Measurement" },
    { source: "field_description", label: "Field Description" },
    { source: "field_location", label: "Field Location" },
    { source: "created_at", label: "Created At" },
  ];

  const fetchData = async () => {
    try {
      const response = await dataProvider.getList("fields", {
        pagination: { page: 1, perPage: 5 },
        sort: { field: "id", order: "ASC" },
      });
      console.log("REQUEST SENT");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const ListActions = () => (
    <Box width="100%">
      <TopToolbar>
        <PostFilterButton />
        <CreateButton />
        <ExportButton />
      </TopToolbar>
      <PostFilterForm additionalFilters={customFilters} />
    </Box>
  );

  useEffect(() => {
    console.log("Accepted Data: ", data);
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <List
        {...props}
        data={data}
        sx={{ color: "#38A505" }}
        actions={<ListActions />}
      >
        <Datagrid rowClick="edit">
          <TextField source="field_name" label="Name" />
          <NumberField source="field_size" label="Size" />
          <TextField source="measurement" label="Measurement" />
          <RichTextField source="field_description" label="Description" />
          <TextField source="field_location" label="Location" />
          <DateField source="created_at" label="Date" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      </List>
    </>
  );
};
