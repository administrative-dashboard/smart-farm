import React from 'react';
import { Button, useRedirect } from 'react-admin';
// import { Link } from 'react-router-dom';


export const SignupButton = () => {
    const redirect = useRedirect();
    const handleClick = () => {
        redirect('/signup');
    }
    return (
        // <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>
        <Button variant="contained"  sx={{ backgroundColor: '#1F4700', mr: 5 }} onClick={handleClick}>
            Signup
        </Button>
        // </Link>
    );
};
