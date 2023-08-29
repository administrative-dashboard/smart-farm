import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { SaveButton } from '../../components/SaveButton';
import { CustomCancelButton } from '../../components/CancelButton';


export const Profile = () => {
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, left: open });
  };

  const list = (
    <Box
      sx={{
        width: 300,
        color: 'white',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Profile Image" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="My Profile" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="About Us" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Info" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ color: '#1F4700' }} />
      </Button>
      <Drawer
        PaperProps={{ sx: { backgroundColor: '#1F4700' } }}
        anchor="left"
        open={state.left}
        onClose={toggleDrawer(false)}
      >
        {list}
      </Drawer>

      <Grid container spacing={10} alignItems="center">
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="subtitle1">Name</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField variant="filled" color="primary" fullWidth />
            </Grid>

            <Grid item xs={4}>
              <Typography variant="subtitle1">Community</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField variant="filled" color="primary" fullWidth />
            </Grid>

            <Grid item xs={4}>
              <Typography variant="subtitle1">Phone</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField variant="filled" color="primary" fullWidth />
            </Grid>

            <Grid item xs={4}>
              <Typography variant="subtitle1">Email</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField variant="filled" color="primary" fullWidth />
            </Grid>

            <Grid item xs={4}>
              <Typography variant="subtitle1">Role</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="filled"
                color="primary"
                fullWidth
                sx={{ background: '#78D819' }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <SaveButton />
          <CustomCancelButton/>
          <CustomCancelButton/>
        </Grid>
      </Grid>
    </div>
  );
};