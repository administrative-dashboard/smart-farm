import React from 'react';
import signBack from '../assets/static/signBack.png';
import { SignupButton } from '../components/SignupButton';
import { Box, Paper, TextField, Typography, MenuItem, } from '@mui/material';

const community = [
  {
    value: 'Community1',
    label: 'Community1',
  },
  {
    value: 'Community2',
    label: 'Community2',
  },
];

export const Contact = () => {
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
          display: 'flex',
          width: 602,
          height: 672,
          padding: '31px 0px 599px 53px',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
          borderRadius: '40px',
          opacity: 0.75,
          background: '#FFF',
        }}
      >
        <Typography variant='h6' sx={{ mb: 8, textAlign: 'center' }}>
          <Typography component='span' variant='h6' sx={{ color: '#38A505', mb: 4 }}>
            Smart Farm
          </Typography>
          <Typography variant='h6' sx={{
            width: 332,
            height: 25,
            color: '#000',
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontSize: 32,
            padding: '30px'
          }}>
            Enter your contacts
          </Typography>
        </Typography>

        <TextField
          id="filled-select-community"
          select
          label="Select Community"
          variant="filled"
          color="primary"
          sx={{
            width: '90%',
            mb: 5,
            padding: '8px 8px',
          }}
        >
          {community.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
        <TextField
          label="Phone number"
          variant="filled"
          color="primary"
          sx={{ width: '90%', mb: 20 }} 
        />
          <div>
            <SignupButton/>
          </div>
      </Box>
    </Paper>
  );
};

