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
import { getJwtTokenFromCookies } from "../../providers/authUtils";
const deviceFilter = [
  <TextInput label="Search" source="q" alwaysOn />,
  <TextInput label="Name" source="device_name" />,
  <TextInput label="Type" source="device_type" />,
  <NumberInput label="Quantity" source="quantity" />,
  <NumberInput label="Shared Quantity" source="shared_quantity" />,
  <DateInput label="Date" source="created_at" />,
];

/* const dataFromJwt = getUserInfoFromCookies(); */
/* console.log(dataFromJwt); */


export const PortableDeviceList = (props) => {
  const dataProvider = useDataProvider();
  const [data, setData] = useState([]);

  
  /* useEffect(() => {
    const fetchData = async () => {
      try {
        const axiosConfig = {
          method: "get",
          url: "http://localhost:5000/portable_devices",
          headers: {
            Authorization: `Bearer ${getJwtTokenFromCookies()}`,
          },
        };

        // Сделать Axios-запрос
        const response = await Axios(axiosConfig);
        setData(response.data);
        console.log("Запрос успешно выполнен");
        console.log(response.data);
        // Do something with the response data if needed

      } catch (error) {
        console.error("Ошибка при получении данных: ", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); */
  
  useEffect(() => {
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
