import React, { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DeleteButton,
  Loading,
} from "react-admin";
import { Typography } from "@mui/material";
import axios from "axios";
import { getJwtTokenFromCookies } from "../../providers/authUtils";
import { API_URL } from "../../consts";

export const UserList = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [communityName, setCommunityName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/community/users`, {
          headers: {
            Authorization: `Bearer ${getJwtTokenFromCookies()}`,
          },
          // params: {
          //   page: 1,
          //   perPage: 10,
          //   sort: "id",
          //   order: "ASC",
          // },
        });
        const { communityName, users } = response.data;

        setCommunityName(communityName);
        setData(users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); 

  if (loading) {
    return <Loading />;
  }

  return (
    <List {...props} title={`Community: ${communityName}`} >
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <EmailField source="email" />
        <TextField source="phone_number" />
        {/* Use the `render` prop to display roles */}
        <TextField label="Role" render={(record) => (
          record.roles.map((role, index) => (
            <span key={index}>{role.value}{index !== record.roles.length - 1 ? ', ' : ''}</span>
          ))
        )} />
        <EditButton basePath="/posts" />
        <DeleteButton basePath="/posts" />
      </Datagrid>
    </List>
  );
};


