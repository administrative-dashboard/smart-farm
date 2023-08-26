//client//pages/owner/DeviceList.js
import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    DateField,
    NumberField,
    EditButton,
    DeleteButton,
    TextInput,
    NumberInput,
    DateInput
} from 'react-admin';
import { Box } from '@mui/material';

import { HomeRedirectButton } from '../../components/HomeRedirectButton';
import { ResetFilters } from '../../components/ResetFilters';


const deviceFilter = [
    <TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="name" source="name" />,
    <TextInput label="type" source="type" />,
    <DateInput label="date" source="date" />,
    <NumberInput label="quantity" source="quantity" />,
];





export const FixedDeviceList = (props) => {
    return (
        <>
            < ResetFilters />
            <List {...props} filters={deviceFilter} sx={{ color: '#38A505', }}>
                <Datagrid >
                    {/* <NumberField source="id" disable/> */}
                    <TextField source="name" />
                    <TextField source="type" />
                    <TextField source="description" />
                    <NumberField source="quantity" />
                    <DateField source='date' />
                    <EditButton basePath='/fixed_devices' />
                    <DeleteButton basePath='/fixed_devices' />
                </Datagrid>
            </List>
            <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                <HomeRedirectButton pageName="devices" title="Devices" />
                <HomeRedirectButton pageName="ownerPage" title="Home" />
            </Box>
        </>
    )
};
