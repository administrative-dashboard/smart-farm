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
  
  return (
    <List {...props} >
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


