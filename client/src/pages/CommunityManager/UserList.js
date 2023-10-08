// UserList.js
import React, { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  TextInput, // Add TextInput for search input
  Filter,   // Add Filter component
  useListContext,
  Loading,
  EditButton,
} from "react-admin";
import customDataProvider from "../../providers/dataProvider";
import axios from "axios";
import { API_URL } from "../../consts";
import { getJwtTokenFromCookies } from "../../providers/authUtils";
import { Box, Typography } from "@mui/material";


const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);
export const UserList = (props) => {
  const dataProvider = customDataProvider;
  const [data, setData] = useState([]);
  const [communityName, setCommunityName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await dataProvider.getList("community/users", {
        pagination: { page: 1, perPage: 10 },
        sort: { user: "id", order: "ASC" },
      });

      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    axios.get(`${API_URL}/user/community`, {
      headers: {
        Authorization: `Bearer ${getJwtTokenFromCookies()}`,
      },
    }).then((response) => {
      setCommunityName(response.data)
    });
  }, []);



  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Typography sx={{ m: "auto", fontWeight: "bold" }} variant="h5" id="react-admin-title">{communityName}</Typography>
          </Box>
          <List {...props} data={data} title=" " filters={<UserFilter />} >
            <Datagrid>
              {/* <TextField source="id" /> */}
              <TextField source="name" />
              <EmailField source="email" />
              <TextField source="phone_number" />
              <TextField label="Roles" source="roles" />
              <TextField label="Permissions" source="permissions" />
              <EditButton />
            </Datagrid>
          </List>
        </>
      )}
    </>
  );
};
