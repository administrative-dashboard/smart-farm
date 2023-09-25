// UserList.js
import React, { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  useListContext,
  Loading,
  Button,
} from "react-admin";
import customDataProvider from "../../providers/dataProvider";
import axios from "axios";
import { API_URL } from "../../consts";
import { getJwtTokenFromCookies } from "../../providers/authUtils";
import { EditRolesButton } from "./EditRolesButton";
/// UserList.js
// ...

export const UserList = (props) => {
  const dataProvider = customDataProvider;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
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
          q: searchTerm,
          name: searchName,
          email: searchEmail,
          phone_number: searchPhone,
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
  }, [searchTerm, searchName, searchEmail, searchPhone]);

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
          <List {...props} data={data} title={communityName}>
            <Datagrid>
              <TextField source="id" />
              <TextField source="name" />
              <EmailField source="email" />
              <TextField source="phone_number" />
              <TextField label="Role" source="roles" />
                <EditRolesButton
                  record={data}
                  onClick={() => handleEditRoles(data)}
                />
            </Datagrid>
          </List>
          {selectedUserId && (
            <EditRolesButton
              record={data.find((user) => user.id === selectedUserId)}
            />
          )}
        </>
      )}
    </>
  );
};

