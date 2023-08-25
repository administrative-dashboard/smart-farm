//client//pages/owner/GreenhouseList.js
import React from 'react';
import { List, Datagrid, TextField, DateField, NumberField } from 'react-admin';
import { HomeRedirectButton } from '../../components/HomeRedirectButton';

export const FieldList = (props) => {
    return (
        <>
            <List {...props}>
                <Datagrid>
                    <TextField source="name" />
                    <NumberField source="size" />
                    <TextField source="description" />
                    <TextField source="location" />
                </Datagrid>
            </List>
            <HomeRedirectButton pageName="ownerPage" title="Home"/>
        </>
    )
};
