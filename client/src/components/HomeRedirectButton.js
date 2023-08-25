import React from 'react';
import { Button, useRedirect } from 'react-admin';
import { Typography } from '@mui/material';


export const HomeRedirectButton = ({pageName, title}) => {
    const redirect = useRedirect();

    const handleHomeButtonClick = () => {
        redirect(`/${pageName}`);
    };

    return (
        <>
            <Button
                variant="outlined"
                sx={{
                    color: '#38A505',
                    border: '1px solid #36D446',
                    px: 4,
                    py: 1,
                    // display: 'flex',
                    alignItems: 'center',
                    m: 'auto',
                    '&:hover': {
                        border: 'lightgreen',
                    },
                }}
                onClick={handleHomeButtonClick}><Typography variant='h6'>{title}</Typography></Button>
        </>
    );
};
