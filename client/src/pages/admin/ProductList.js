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
import styled from 'styled-components';
/*const StyledItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f0f0f0;
`;

const StyledLabel = styled.span`
  font-size: ${(props) => (props.isName ? '19px' : '14px')};
  font-weight: ${(props) => (props.isName ? 'bold' : 'normal')};
`;
*/
export const ProductListAdm = (props) => {
    return (
        <>
            <ResetFilters />
            <List
                {...props}
                filters={[
                    <TextInput label="Search" source="q" alwaysOn />,
                    <TextInput label="name" source="name" />,
                    <TextInput label="size" source="type" />,
                    <TextInput label="description" source="description" />,
                    <TextInput label="location" source="location" />,
                ]}
            >
                <Datagrid>
          
            <TextField source="name" label="Greenhouse" />
          
            <TextField source="size" label="Size" />
          
            <TextField source="description" label="Description" />
          
            <TextField source="location" label="Location" />
          
            <ShowButton basePath="/Product" label="Show" />
        </Datagrid>
            </List>
        </>
    );
};

