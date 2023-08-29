// Fixed.js
import * as React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

export const UserShowAdm = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" label="name" />
            <TextField source="community" label="community" />
            <TextField source="phone" label="phone" />
            <TextField source="email" label="email" />
        </SimpleShowLayout>
    </Show>
);


