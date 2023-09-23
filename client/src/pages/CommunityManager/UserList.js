import React, { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DeleteButton,
  useListContext,
  Loading,
} from "react-admin";
import customDataProvider from "../../providers/dataProvider";

export const UserList = (props) => {
  const dataProvider = customDataProvider;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [communityName, setCommunityName] = useState(""); // Added communityName state

  const fetchData = async () => {
    try {
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

      // Update the data and communityName states
      setData(response.data);
      // setCommunityName(response.communityName); // Assuming the communityName is part of the response
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, searchName, searchEmail, searchPhone]); // Listen for changes in search criteria

  return (
  <>
      <List {...props} data={data}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <EmailField source="email" />
          <TextField source="phone_number" />
          <TextField label="Role" source="roles" cellClassName="roles-field" />
          <EditButton basePath="/users" />
          <DeleteButton basePath="/users" />
        </Datagrid>
      </List>
    </>
  );
};
