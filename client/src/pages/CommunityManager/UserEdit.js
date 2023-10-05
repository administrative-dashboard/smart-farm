// UserEdit.js
import React, { useEffect, useState } from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectArrayInput,
  Loading,
  Error,
  useNotify,
  useRedirect,
  SaveButton,
  Toolbar,
} from "react-admin";
import axios from "axios";
import { API_URL } from "../../consts";
import { getJwtTokenFromCookies } from "../../providers/authUtils";
import customDataProvider from "../../providers/dataProvider";
const UserEditToolbar = props => (
  <Toolbar {...props} >
      <SaveButton />
  </Toolbar>
);

export const UserEdit = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch roles and permissions
    const fetchRolesAndPermissions = async () => {
      try {
        const rolesResponse = await axios.get(`${API_URL}/user/roles`, {
          headers: {
            Authorization: `Bearer ${getJwtTokenFromCookies()}`,
          },
        });
        const permissionsResponse = await axios.get(`${API_URL}/user/perms`, {
          headers: {
            Authorization: `Bearer ${getJwtTokenFromCookies()}`,
          },
        });

        setRoles(rolesResponse.data);
        setPermissions(permissionsResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (props.record) {
      setSelectedRoles(props.record.roles || []);
      setSelectedPermissions(props.record.permissions || []);
    }

    fetchRolesAndPermissions();
  }, [props.record]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const handleSave = async (values) => {
    try {
      const userData = {
        id: values.id,
        name: values.name,
        phone_number: values.phone_number,
        roles: values.roles,
        permissions: values.permissions,
      };
  
      const response = await customDataProvider.update("community/users", {
        data: userData,
        id: userData.id,
      });
      if (response.status===200) {
        notify("User updated successfully", "info");
        redirect("/community/users");
      } else {
        notify("An error occurred", { type: "error" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Edit title="Edit a user" {...props} resource="community/users">
      <SimpleForm onSubmit={handleSave} toolbar={<UserEditToolbar />}>
        <TextInput source="name" label="Name" disabled/>
        <TextInput source="phone_number" label="Phone_number" disabled />
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
  );
};
