import React, { useEffect, useState } from "react";
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
} from "react-admin";
import { Box } from "@mui/material";
import { useDataProvider } from "react-admin";

import { HomeRedirectButton } from "../../components/HomeRedirectButton";
import { ResetFilters } from "../../components/ResetFilters";
import { getUserInfoFromCookies } from "../../providers/authUtils";

const deviceFilter = [
  <TextInput label="Search" source="q" alwaysOn />,
  <TextInput label="Name" source="device_name" />,
  <TextInput label="Type" source="device_type" />,
  <NumberInput label="Quantity" source="quantity" />,
  <NumberInput label="Shared Quantity" source="shared_quantity" />,
  <DateInput label="Date" source="created_at" />,
];

export const PortableDeviceList = (props) => {
  const dataProvider = useDataProvider();
  const [data, setData] = useState([]);

  /* useEffect(() => {
    // Fetch data using the getList method
    dataProvider
      .getList('portable_devices', {
        pagination: { page: 1, perPage: 10 }, // Adjust perPage and page as needed
        sort: { field: 'id', order: 'ASC' }, // Adjust sorting as needed
        filter: {}, // Add filters as needed
      })
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, [dataProvider]);
 */
  useEffect(() => {
    const dataFromJwt = getUserInfoFromCookies();
    
    // Define your Axios request config
    const axiosConfig = {
      method: "get",
      url: "http://localhost:5000/portable_devices",
      params: {
        page: 1,
        perPage: 10,
        sort: "id",
        order: "ASC",
      },
      headers: {
        "user-data": JSON.stringify(dataFromJwt), // Send user-specific data in a custom header
      },
    };

    // Make the Axios request
    
      Axios(axiosConfig)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    console.log(dataFromJwt);    
    
  }, []);
  return (
    <>
      <ResetFilters />
      <List
        {...props}
        data={data}
        filters={deviceFilter}
        sx={{ color: "#38A505" }}
      >
        <Datagrid>
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
