//client//pages/owner/GreenhouseList.js
import { Typography } from '@mui/material';
import React from 'react';
import { List, Datagrid, TextField, DateField, NumberField, Button, useRedirect } from 'react-admin';
import { HomeRedirectButton } from '../../components/HomeRedirectButton';

export const GreenhouseList = (props) => {

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
