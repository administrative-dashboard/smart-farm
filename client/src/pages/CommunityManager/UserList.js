import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { PostFilters } from "../../components/SearchInput";

export const UserList = (props) => {
  return (
    <List {...props} filters={PostFilters}>
      <Datagrid>
        <TextField source="Id" />
        <TextField source="name" />
        <EmailField source="email" />
        <TextField source="phone" />
        <TextField source="Role" />
        <EditButton basePath="/posts" />
        <DeleteButton basePath="/posts" />
      </Datagrid>
    </List>
  );
};
