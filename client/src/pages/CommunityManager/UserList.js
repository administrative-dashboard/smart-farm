import React, { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DeleteButton,
  useDataProvider,
} from "react-admin";
import { PostFilters } from "../../components/SearchInput";
import { Typography } from "@mui/material";

export const UserList = (props) => {
  const dataProvider = useDataProvider();
  const [data, setData] = useState([]);
  useEffect(() => {
    // Fetch data using the getList method
    dataProvider
      .getList('community/users', {
        pagination: { page: 1, perPage: 10 }, // Adjust perPage and page as needed
        sort: { field: 'id', order: 'ASC' }, // Adjust sorting as needed
        // filter: {}, // Add filters as needed
      })
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, [dataProvider]);

  return (
    <List {...props} filters={PostFilters}>
       <Typography variant="h6">Community name</Typography>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <EmailField source="email" />
        <TextField source="phone_number" />
        <TextField source="role" />
        <EditButton basePath="/posts" />
        <DeleteButton basePath="/posts" />
      </Datagrid>
    </List>
  );
};
