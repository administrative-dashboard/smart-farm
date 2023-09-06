//client//pages/owner/DeviceList.js
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

import { HomeRedirectButton } from "../../components/HomeRedirectButton";
import { ResetFilters } from "../../components/ResetFilters";

const deviceFilter = [
  <TextInput label="Search" source="q" alwaysOn />,
  <TextInput label="name" source="name" />,
  <TextInput label="type" source="type" />,
  <DateInput label="date" source="date" />,
  <NumberInput label="quantity" source="quantity" />,
];

export const PortableDeviceList = (props) => {
 
  const [data, setData] = useState([]);
  useEffect(() => {
    // Отправляем запрос на сервер для получения данных
    Axios.get("http://localhost:5000/fixed_devices") // Замените "ВАШ_СЕРВЕР_URL_ЗДЕСЬ" на URL вашего сервера
      .then((response) => {
        setData(response.data); // Обновляем состояние данными с сервера
        
        
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных: ", error);
      })
      
  }, []);
  return (
    <>
      <ResetFilters />
      <List {...props} data={data} filters={deviceFilter} sx={{ color: "#38A505" }}>
        <Datagrid>
          {/* <NumberField source="id" disable/> */}
          <TextField source="name" />
          <TextField source="type" />
          <TextField source="description" />
          <NumberField source="quantity" />
          <DateField source="date" />
          <EditButton  />
          <DeleteButton  />
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
