//FixedDeviceListAdm.js
import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  DateField,
  NumberField,
  ShowButton,
} from 'react-admin';
import { Box, Button } from '@mui/material';
import { ResetFilters } from '../../components/ResetFilters';

export const GreenhouseListAdm = (props) => {
  return (
    <>
      <ResetFilters />
      <List
        {...props}
        filters={[
          <TextInput label="Search" source="q" alwaysOn />,
          <TextInput label="Name" source="name" />,
          <TextInput label="Owner" source="owner" />,
          <TextInput label="Size" source="size" />,
          <TextInput label="Description" source="description" />,
          <TextInput label="Location" source="location" />,
        ]}
      >
        <Datagrid>
          <TextField source="name" label="Greenhouse" />
          <TextField source="owner" label="Owner" />
          <TextField source="size" label="Size" />
          <TextField source="description" label="Description" />
          <TextField source="location" label="Location" />
          <ShowButton basePath="/Greenhouse" label="Show" />
        </Datagrid>
      </List>
    </>
  );
};

