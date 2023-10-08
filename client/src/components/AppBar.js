//AppBar.js
import * as React from "react";
import {
  AppBar,
  TitlePortal,
  UserMenu,
  LocalesMenuButton,
} from "react-admin";
import { MenuItem, ListItemIcon, Typography, Avatar } from "@mui/material";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import Face6Icon from "@mui/icons-material/Face6";
import { Logo } from "./LogoButton";
import { SigninButton } from "./SigninButton";
import { LogoutButton } from "./LogoutButton";
import { ProfileButton } from "./ProfileButton";
import axios from "axios";
// import { API_URL } from "../consts";
import { 
  getJwtTokenFromCookies, 
  // getUserInfoFromCookies 
} from "../providers/authUtils";
import { authProvider } from "../providers/authPovider";

const API_URL=process.env.REACT_APP_API_URL;
const MyCustomIcon = ({ profileImage }) => (
  <Avatar
    sx={{
      height: 30,
      width: 30,
    }}
    src={profileImage}
  />
);

export const MyAppBar = () => {
  const [user, setUser] = React.useState(null);
  const [profileImage, setProfileImage] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const isAuthenticated = getJwtTokenFromCookies() ? true : false;
React.useEffect(() => {
  const fetchUserInfo = () => {
    axios.get(`${API_URL}/user/info`, {
      headers: {
        Authorization: `Bearer ${getJwtTokenFromCookies()}`
      }
    })
    .then(response => {
      setUser(response.data);
      setProfileImage(response.data.profile_image);
      setEmail(response.data.email);
    })
    .catch(error => {
      console.error("Error fetching user info:", error);
      authProvider.logout();
    });
  };

  if (isAuthenticated) {
    fetchUserInfo();
  }
}, []);

  return (
    <AppBar
      color="inherit"
      sx={{ p: 0 }}
      userMenu={
        isAuthenticated ? (
          <UserMenu
          icon={<MyCustomIcon profileImage={profileImage} />}
        >
            <MenuItem   >
              <ListItemIcon>
                <ContactPageIcon fontSize="small" />
              </ListItemIcon>
              <ProfileButton/> 
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Face6Icon fontSize="small" />
              </ListItemIcon>
              <LogoutButton />
            </MenuItem>
            <Typography variant="body1" color="textSecondary">
              {email}
            </Typography>
          </UserMenu>
        ) : (
          false
        )
      }
    >
      <Logo />
      <TitlePortal />
      <LocalesMenuButton
        languages={[
          { locale: "en", name: "English" },
          { locale: "am", name: "Հայերեն" },
        ]}
      />
      {isAuthenticated ? null : <SigninButton />}
    </AppBar>
  );
};

