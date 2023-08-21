import React from 'react';
import { GoogleButton } from '../components/GoogleButton';
import signBack from '../assets/static/signBack.png'
import { Box, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
export const Signup = () => {
    return (
        <Paper
            sx={{
                backgroundImage: `url(${signBack})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    background: 'rgba(255, 255, 255, 0.75)',
                    padding: '20px',
                    borderRadius: '40px',
                    height: '60%',
                    width: '25%',
                    display: 'flex',
                    // justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pb: 5
                }}>
                <Typography variant='h6' sx={{ my: 2 }}>
                    Welcome to{' '}
                    <Typography component='span' variant='h6' sx={{ color: '#38A505', display: 'inline' }}>
                        Smart Farm
                    </Typography>
                </Typography>
                <Typography variant='h4' sx={{ color: '#38A505', display: 'inline', m: 'auto' }}>
                    Sign Up
                </Typography>
                <GoogleButton sx={{ m: 'auto' }} />
                <Link to="/signin" style={{ textDecoration: 'none', color: 'black', margin: 'auto' }}>
                    <Typography sx={{ mt: 'auto' }}>
                        {'Do you have an account? '}

                        <Typography component='span' sx={{ color: '#38A505', display: 'inline' }}>
                            Sign In
                        </Typography>

                    </Typography>
                </Link>
            </Box>
        </Paper>
    );
};

