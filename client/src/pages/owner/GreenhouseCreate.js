//client//pages/owner/DeviceList.js
import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    useNotify,
    useRedirect,
    NumberInput
} from 'react-admin';
import { HomeRedirectButton } from '../../components/HomeRedirectButton';

export const GreenhouseCreate = (props) => {

    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = (data) => {
        notify(`Changes saved`);
        redirect('/greenhouses');
    };
    return (
        <>
            <Create title='Create a greenhouse' {...props} mutationOptions={{ onSuccess }}>
                <SimpleForm>
                    <TextInput source="name" />
                    <NumberInput source="size" />
                    <TextInput source="description" />
                    <TextInput source="location" />
                </SimpleForm>
            </Create>
            <HomeRedirectButton pageName="ownerPage" title="Home" />
        </>
    )
};
