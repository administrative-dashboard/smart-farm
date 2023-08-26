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

export const FieldCreate = (props) => {

    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = (data) => {
        notify(`Changes saved`);
        redirect('/fields');
    };
    return (
        <>
            <Create title='Create a field' {...props} mutationOptions={{ onSuccess }}>
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
