// ProductList

import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  EditButton,
  DeleteButton,
  TopToolbar,
  ExportButton,
  CreateButton,
} from "react-admin";
import { Box } from "@mui/material";
import { ResetFilters } from "../../components/ResetFilters";
import { useState, useEffect } from "react";
import customDataProvider from "../../providers/dataProvider"
import { PostFilterButton } from "../../components/PostFilterButton";
import { PostFilterForm } from "../../components/PostFilterForm";

export const ProductList = (props) => {
  const dataProvider = customDataProvider;
  const [data, setData] = useState([]);
  const customFilters = [
    { source: "product_name", label: "Product Name" },
    { source: "product_type", label: "Product Type" },
    { source: "description", label: "Description" },
    { source: "created_at", label: "Created At" },
  ];

  const fetchData = async () => {
    try {
      const response = await dataProvider.getList("products", {
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
        actions={<ListActions />}
        sx={{ color: "#38A505" }}
      >
        <Datagrid rowClick="edit">
          <TextField source="product_name" label="Name" />
          <TextField source="product_type" label="Type" />
          <NumberField source="description" label="Description" />
          <DateField source="created_at" label="Date" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      </List>
    </>
  );
};
