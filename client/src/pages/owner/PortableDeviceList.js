//client//pages/owner/DeviceList.js
import React from 'react';
import { List, Datagrid, TextField, DateField, NumberField, EditButton, DeleteButton } from 'react-admin';
import { HomeRedirectButton } from '../../components/HomeRedirectButton';
import { Box } from '@mui/material';

export const PortableDeviceList = (props) => {
    return (
        <>
            <List {...props}>
                <Datagrid>
                    <TextField source="name" />
                    <TextField source="type" />
                    <TextField source="description" />
                    <EditButton basePath='/portable_devices' />
                    <DeleteButton basePath='/portable_devices' />
                </Datagrid>
            </List>
            <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
            <HomeRedirectButton pageName="devices" title="Devices"/>
            <HomeRedirectButton pageName="ownerPage" title="Home"/>
            </Box>
        </>
    )
};
