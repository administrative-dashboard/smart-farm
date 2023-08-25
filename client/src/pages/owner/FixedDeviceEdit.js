//client//pages/owner/DeviceList.js
import React from 'react';
import { Edit, SimpleForm, TextInput} from 'react-admin';
import { HomeRedirectButton } from '../../components/HomeRedirectButton';
import { Box } from '@mui/material';


export const FixedeDeviceEdit = (props) => {

    return (
        <>
            <Edit title='Edit a portable device' {...props}>
                <SimpleForm>
                    <TextInput source="name" />
                    <TextInput source="type" />
                    <TextInput source="description" />
                </SimpleForm>
            </Edit>
            <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
            <HomeRedirectButton pageName="devices" title="Devices"/>
            <HomeRedirectButton pageName="ownerPage" title="Home"/>
            </Box>
        </>
    )
};
