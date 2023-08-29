import React, { useState } from 'react';
// import { GoogleLogin } from 'react-google-login';
// import {authProvider} from "../utils/googleProvider"
import { Button, useLogin, useRedirect } from 'react-admin';
import {
    useMediaQuery,
    useTheme
} from '@mui/material';

import googleLogo from '../assets/static/googleLogo.svg';

// const GOOGLE_CLIENT_ID = '654868766388-l165egll3330ikvpf734diu2lf54uehc.apps.googleusercontent.com';

export const GoogleButton = () => {
    const redirect = useRedirect();
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [loading, setLoading] = useState(false);
    const login = useLogin();
  const handleLogin = () => {
    setLoading(true);
    login({});
    redirect('/contact');
  }

    return (

        <Button
            onClick={handleLogin}
            disabled={loading}
            variant="outlined"
            sx={{
                color: '#38A505',
                border: '1px solid #36D446',
                px: isMediumScreen ? 4 : 2,
                py: 1,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <img
                src={googleLogo}
                alt="Google Logo"
                style={{
                    width: '24px',
                    height: '24px',
                    marginRight: isMediumScreen ? '8px' : '4px',
                }}
            />
            {isMediumScreen && 'Continue with Google'}
        </Button>
    );
};


