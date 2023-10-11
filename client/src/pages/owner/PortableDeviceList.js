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
import { useState, useEffect } from "react";
import customDataProvider from "../../providers/dataProvider";
import { PostFilterButton } from "../../components/PostFilterButton";
import { PostFilterForm } from "../../components/PostFilterForm";
export const PortableDeviceList = (props) => {
  const dataProvider = customDataProvider;
  const [data, setData] = useState([]);
  const customFilters = [
    { source: "device_name", label: "Device Name" },
    { source: "device_type", label: "Device Type" },
    {
      source: "quantity",
      label: "Device quantity",
    },
    { source: "shared_quantity", label: "Shared Quantity" },
    { source: "created_at", label: "Created At" },
  ];
  const fetchData = async () => {
    try {
      const response = await dataProvider.getList("portable_devices", {
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
        title=" "
      >
        <Datagrid rowClick="edit">
          <TextField source="device_name" label="Name" />
          <TextField source="device_type" label="Type" />
          <NumberField source="quantity" label="Quantity" />
          <NumberField source="shared_quantity" label="Shared Quantity" />
          <DateField source="created_at" label="Date" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      </List>
    </>
  );
};
