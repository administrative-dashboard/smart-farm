//Useredit.js
import React, { useEffect, useState } from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectArrayInput,
} from "react-admin";
import axios from "axios";
import { API_URL } from "../../consts";
import { getJwtTokenFromCookies } from "../../providers/authUtils";
import { Box } from "@mui/material";

export const UserEdit = (props) => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    // Fetch roles
    axios
      .get(`${API_URL}/user/roles`, {
        headers: {
          Authorization: `Bearer ${getJwtTokenFromCookies()}`,
        },
      })
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles: ", error);
      });

    // Fetch permissions
    axios
      .get(`${API_URL}/user/perms`, {
        headers: {
          Authorization: `Bearer ${getJwtTokenFromCookies()}`,
        },
      })
      .then((response) => {
        setPermissions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching permissions: ", error);
      });

    // Ensure props.record exists and contains 'roles' and 'permissions' properties
    if (props.record) {
      setSelectedRoles(props.record.roles || []);
      setSelectedPermissions(props.record.permissions || []);
    }
  }, [props.record]);

  return (
    <>
      <Edit title="Edit a user" {...props} resource="community/users">
        <SimpleForm>
          <TextInput source="name" label="Name" />
          <TextInput source="phone_number" label="Phone_number" />
          <SelectArrayInput
            source="roles"
            label="Roles"
            choices={roles.map((role) => ({
              id: role.value,
              name: role.value,
            }))}
            initialValue={selectedRoles}
          />
          <SelectArrayInput
            source="permissions"
            label="Permissions"
            choices={permissions.map((permission) => ({
              id: permission.value,
              name: permission.value,
            }))}
            initialValue={selectedPermissions}
          />
        </SimpleForm>
      </Edit>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      ></Box>
    </>
  );
};
