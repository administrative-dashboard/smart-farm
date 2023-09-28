// product list

import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  EditButton,
  DeleteButton,
  TextInput,
  DateInput,
  Filter,
  SearchInput,
} from "react-admin";
import { Box } from "@mui/material";
import { ResetFilters } from "../../components/ResetFilters";
import { useState, useEffect } from "react";
import customDataProvider from "../../providers/dataProvider";

export const ProductList = (props) => {
  const dataProvider = customDataProvider;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const fetchData = async () => {
    try {
      const response = await dataProvider.getList("products", {
        pagination: { page: 1, perPage: 5 },
        sort: { product: "id", order: "ASC" },
        filter: {
          q: searchTerm,
          product_name: searchName,
          product_type: searchType,
          product_description: searchDescription,
          created_at: searchDate,
        },
      });

      console.log("ЗАПРОС ОТПРАВЛЕН  ");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const ProductFilter = (props) => (
    <Filter {...props}>
      <SearchInput source="q" alwaysOn onChange={handleSearchInputChange} />
      <TextInput
        label="Name"
        source="product_name"
        onChange={handleSearchNameChange}
      />
      <TextInput
        label="Type"
        source="product_type"
        onChange={handleSearchTypeChange}
      />
      <TextInput
        label="Description"
        source="product_description"
        onChange={handleSearchDescriptionChange}
      />
      <DateInput
        label="Date"
        source="created_at"
        onChange={handleSearchDateChange}
      />
    </Filter>
  );
  useEffect(() => {
    fetchData();
  }, [searchTerm, searchName, searchType, searchDescription, searchDate]);

  const handleSearchInputChange = async (e) => {
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
  const handleSearchTypeChange = async (e) => {
    if (e.target.value) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSearchType(e.target.value);
    }
  };
  const handleSearchDescriptionChange = async (e) => {
    if (e.target.value) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSearchDescription(e.target.value);
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

      <List
        {...props}
        data={data}
        filters={<ProductFilter />}
        sx={{ color: "#38A505" }}
      >
        <Datagrid rowClick="edit">
          <TextField source="product_name" label="Name" />
          <TextField source="product_type" label="Type" />
          <NumberField source="product_description" label="Description" />
          <DateField source="created_at" label="Date" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      </List>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      ></Box>
    </>
  );
};
