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
  Button,
  EditButton,
} from "react-admin";
import customDataProvider from "../../providers/dataProvider";
import axios from "axios";
import { API_URL } from "../../consts";
import { getJwtTokenFromCookies } from "../../providers/authUtils";
import { EditRolesButton } from "./EditRolesButton";

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
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await dataProvider.getList("community/users", {
        pagination: { page: 1, perPage: 10 },
        sort: { field: "id", order: "ASC" },
        filter: {
          
        },
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

  const handleEditRoles = async (user) => {
    try {
      setLoading(true);
      const response = await dataProvider.getOne("community/users", {
        id: user.id,
      });

      // Pass the user data to the EditRolesButton component
      setSelectedUserId(user.id);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data: ", error);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <List {...props} data={data} title={communityName}   filters={<UserFilter />} >
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
