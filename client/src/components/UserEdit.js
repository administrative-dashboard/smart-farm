import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
} from 'react-admin';
const UserEdit = (props) => {
    return (
        <Edit title='Edit a User' {...props}>
            <SimpleForm>
            <TextInput disabled source="id" />
                <TextInput source="name" />
                <TextInput source="email" />
                <TextInput source="phone" />
                <TextInput source="role"/>
            </SimpleForm>
        </Edit>
    );
};

export default UserEdit;