//client//pages/owner/DeviceList.js
import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput
} from 'react-admin';
import { HomeRedirectButton } from '../../components/HomeRedirectButton';



export const GreenhouseEdit = (props) => {

    return (
        <>
            <Edit title='Edit a greenhouse' {...props}>
                <SimpleForm>
                    <TextInput source="name" />
                    <NumberInput source="size" />
                    <TextInput source="description" />
                    <TextInput source="location" />
                </SimpleForm>
            </Edit>
            <HomeRedirectButton pageName="ownerPage" title="Home" />
        </>
    )
};
