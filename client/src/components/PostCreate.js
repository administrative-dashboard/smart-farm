import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    EmailField
} from 'react-admin'

const PostCreate = (props) => {
    return (
        <Create title='Create a Post' {...props}>
            <SimpleForm>
                <NumberInput source="id" />
                <TextInput source='Name' />
                <EmailField source='Email'/>
                <TextInput  source='Phone number' />
                <TextInput source='Role'/>
            </SimpleForm>
        </Create>
    );
};

export default PostCreate;