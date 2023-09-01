import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { MyBar } from "../../components/Drawer";
import ImageCardList from "../../components/ImageCardList";
import schedule from "../../assets/static/sticky-note.png";
import { drawer_data } from "../../assets/static/mockData/community_owner";

const imageCardData = [
  {
    img: schedule,
    title: "Schedule",
    link: "#Schedule",
  },
];
export const CommunityManager = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={2}>
        <MyBar drawerData={drawer_data} />
      </Grid>
      <Grid item xs={12} md={10}>
        <Container>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: 700,
              fontFamily: "Roboto",
              fontSize: "3rem",
              mt: "40px",
              ml: "20%",
            }}
          >
            Info
          </Typography>
        </Container>
      </Grid>
      <Grid item xs={12} md={10}>
        <Container>
          <ImageCardList data={imageCardData} />
        </Container>
      </Grid>
    </Grid>
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
*/
