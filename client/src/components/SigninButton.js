import React from 'react';
import { Button, useRedirect } from 'react-admin';
// import { Link } from 'react-router-dom';


export const SigninButton = () => {
    const redirect = useRedirect();
    const handleClick = () => {
        redirect('/signin');
    }
    return (
        // <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>
        <Button variant="contained" sx={{ backgroundColor: '#1F4700', mr: 5 }} onClick={handleClick}>
            Signin
        </Button>
        // </Link>
    );
};
