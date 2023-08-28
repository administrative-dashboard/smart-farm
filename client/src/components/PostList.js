import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    EditButton,
    DeleteButton,
} from 'react-admin';
import {PostFilters} from './SearchInput'
const PostList = (props) => {
    return <List {...props}  filters = {PostFilters}>
        <Datagrid>
            <TextField source='Id' />
            <TextField source='Name' reference="users"/>
            <EmailField source='Email' />
            <TextField source='Phone number'/>
            <TextField source='Role'/>
            <EditButton basePath='/posts' />
            <DeleteButton basePath='/posts' />
        </Datagrid>
    </List>;
};

export default PostList;