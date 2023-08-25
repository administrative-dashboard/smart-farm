//client//pages/owner/DeviceList.js
import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { HomeRedirectButton } from '../../components/HomeRedirectButton';
import { Box } from '@mui/material';

export const PortableDeviceCreate = (props) => {
    return (
        <>
            <Create title='Create a portable device' {...props}>
                <SimpleForm>
                    <TextInput source="name" />
                    <TextInput source="type" />
                    <TextInput source="description" />
                </SimpleForm>
            </Create>
            <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
            <HomeRedirectButton pageName="devices" title="Devices"/>
            <HomeRedirectButton pageName="ownerPage" title="Home"/>
            </Box>
        </>
    )
};
