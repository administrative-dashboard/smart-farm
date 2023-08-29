import React from 'react';
import { Button, useRedirect } from 'react-admin';
export const SaveButton = () => {
    const redirect = useRedirect();
    const handleClick = () => {
        redirect('/Dashboard');
    }
    return (
        <Button variant="contained" sx={{
            width: '100px',
            height: '50px',
            background: '#1F4700'
        }} onClick={handleClick}>
            Save
        </Button>
    );
};