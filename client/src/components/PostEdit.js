import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    TextField,
    EmailField
} from 'react-admin';

const PostEdit = (props) => {
    return (
        <Edit title='Edit a Post' {...props}>
            <SimpleForm>

                <TextInput source='Name' />
                <EmailField source='Email' />
                <TextField source='Phone number'/>
 {/*}              <TextField source='Role'/>*/}
            </SimpleForm>
        </Edit>
    );
};

export default PostEdit;