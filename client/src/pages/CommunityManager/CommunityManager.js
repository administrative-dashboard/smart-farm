import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import note from "../../assets/static/sticky-note.png";

export const CommunityManager = () => {
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
      <List >
        <ListItem disablePadding>
          <ListItemButton>
            <Link to="/Users" style={{ textDecoration: 'none' }}>
              <ListItemText
                primary="Manage user"
                sx={{textAlign: 'center',color: 'white' }}
              />
            </Link>
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

      <Box sx={{ display: 'flex', flexDirection: 'column',margin: '60px',marginRight: 'auto'}}>
      <img src={note} alt="Sticky Note" style={{ width: '100px', height: 'auto' }} />
        <Typography >
          Schedule
        </Typography>
      </Box>
    </div>
  );
};

