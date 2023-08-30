import React, { useState } from 'react';
import {
  Container,
  TextField,
  Typography,
  Box,
  Grid,
  useMediaQuery,
  Button,
} from '@mui/material';
import { CustomCancelButton } from '../../components/CancelButton';
import { MyBar } from '../../components/Drawer';
import { drawer_new_data } from '../../assets/static/mockData/new_data';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
export const Profile = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const initialFormData = {
    name: '',
    community: '',
    phone: '',
    email: '',
    role: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const handleReset = () => {
    setFormData(initialFormData);
  };
  return (
    <Container>
      <Grid container spacing={2}>
        {!isSmallScreen && (
          <Grid item xs={12} md={3}>
            <MyBar drawerData={drawer_new_data} />
          </Grid>
        )}
        <Grid item xs={12} md={isSmallScreen ? 12 : 9}>
          <Box p={2}>
            <Typography variant="h4" gutterBottom>
              New Data
            </Typography>
            <TextField
              variant="filled"
              label="Name"
              color="primary"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
              <TextField
              variant="filled"
              label="Profile image"
              color="primary"
              fullWidth
              margin="normal"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            <TextField
              variant="filled"
              label="Community"
              color="primary"
              fullWidth
              margin="normal"
              value={formData.community}
              onChange={(e) => setFormData({ ...formData, community: e.target.value })}
            />
            <TextField
              variant="filled"
              label="Phone"
              color="primary"
              fullWidth
              margin="normal"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <TextField
              variant="filled"
              label="Email"
              color="primary"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Box display="flex" justifyContent="flex-end" mt={3}>
              <CustomCancelButton onClick={handleReset} sx={{backgroundColor: ' #1F4700'}} />
              <Button
                component={Link}
                to="/users"
                variant="contained"
                color="primary"
                sx={{ marginLeft: '10px', backgroundColor: '#1F4700', color: 'white' }}
              >
                Request
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};


/*import React, { useState } from 'react';
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
};*/