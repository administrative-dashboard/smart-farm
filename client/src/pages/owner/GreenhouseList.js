import {
  DateField,
  List,
  TextField,
  NumberField,
  EditButton,
  DeleteButton,
  Datagrid,
  RichTextField,
  TopToolbar, ExportButton, CreateButton
} from "react-admin";
import { Box } from "@mui/material";
import { PostFilterButton } from "../../components/PostFilterButton";
import { PostFilterForm } from "../../components/PostFilterForm";
import { useState, useEffect } from "react";
import customDataProvider from "../../providers/dataProvider";
export const GreenhouseList = (props) => {
  const dataProvider = customDataProvider;
  const [data, setData] = useState([]);
  const customFilters = [
    { source: "greenhouse_name", label: "Greenhouse Name" },
    { source: "greenhouse_size", label: "Greenhouse Size" },
    {
      source: "greenhouse_size_measurement",
      label: "Greenhouse Size Measurement",
    },
    { source: "greenhouse_description", label: "Greenhouse Description" },
    { source: "greenhouse_location", label: "Greenhouse Location" },
    { source: "created_at", label: "Created At" },
  ];
  const fetchData = async () => {
    try {
      const response = await dataProvider.getList("greenhouses", {
        pagination: { page: 1, perPage: 5 },
        sort: { field: "id", order: "ASC" },
      });
      console.log("REQUEST SEND  ");
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
          <TextField source="greenhouse_name" label="Name" />
          <NumberField source="greenhouse_size" label="Size" />
          <TextField source="measurement" label="Measurement" />
          <RichTextField source="greenhouse_description" label="Description" />
          <TextField source="greenhouse_location" label="Location" />
          <DateField source="created_at" label="Date" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      </List>
    </>
  );
};
