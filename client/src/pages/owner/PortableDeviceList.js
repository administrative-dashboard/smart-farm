import Axios from "axios";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  EditButton,
  DeleteButton,
  TextInput,
  NumberInput,
  DateInput,
  Filter,
  SearchInput, // Import Filter
} from "react-admin";
import { Box } from "@mui/material";
import { useDataProvider } from "react-admin";
import { HomeRedirectButton } from "../../components/HomeRedirectButton";
import { ResetFilters } from "../../components/ResetFilters";
import { useState, useEffect } from "react";
import customDataProvider from "../../providers/dataProvider";
export const PortableDeviceList = (props) => {
  const dataProvider = customDataProvider;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchQuantity, setSearchQuantity] = useState("");
  const [searchSharedQuantity, setSearchSharedQuantity] = useState("");
  const [searchDate,setSearchDate]= useState("");
  const fetchData = async () => {
    try {
      const response = await dataProvider.getList("portable_devices", {
        pagination: { page: 1, perPage: 10 },
        sort: { field: "id", order: "ASC" },
        filter: {
           q: searchTerm,
           device_name: searchName,
           device_type: searchType,
           quantity: searchQuantity, 
           shared_quantity: searchSharedQuantity,
           created_at: searchDate, 
        }, 
      });

      console.log("ЗАПРОС ОТПРАВЛЕН  ");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  
  const DeviceFilter = (props) => (
    <Filter {...props}>
      <SearchInput source="q" alwaysOn onChange={handleSearchInputChange} />
      <TextInput label="Name" source="device_name" onChange={handleSearchNameChange} />
      <TextInput label="Type" source="device_type" onChange={handleSearchTypeChange}/>
      <NumberInput label="Quantity" source="quantity" onChange={handleSearchQuantityChange}/>
      <NumberInput label="Shared Quantity" source="shared_quantity" onChange={handleSearchSharedQuantityChange}/>
      <DateInput label="Date" source="created_at" onChange={handleSearchDateChange}/>
    </Filter>
  );
  useEffect(() => {
    fetchData(); 
  }, [searchTerm,searchName,searchType,searchQuantity,searchSharedQuantity,searchDate]);

  const handleSearchInputChange = async (e) => {
    if (e.target.value) {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      setSearchTerm(e.target.value);
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
  const handleSearchQuantityChange = async (e) => {
    if (e.target.value) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSearchQuantity(e.target.value);
    }
  };
  const handleSearchSharedQuantityChange = async (e) => {
    if (e.target.value) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSearchSharedQuantity(e.target.value);
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
        filters={<DeviceFilter />} 
        sx={{ color: "#38A505" }}
      >
        <Datagrid>
          {" "}
          <TextField source="device_name" label="Name" />
          <TextField source="device_type" label="Type" />
          <NumberField source="quantity" label="Quantity" />
          <NumberField source="shared_quantity" label="Shared Quantity" />
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
      >
        <HomeRedirectButton pageName="devices" title="Devices" />
        <HomeRedirectButton pageName="ownerPage" title="Home" />
      </Box>
    </>
  );
};
