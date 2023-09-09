import * as React from "react";
import {
  AppBar,
  TitlePortal,
  useAuthenticated,
  UserMenu,
  LocalesMenuButton,
} from "react-admin";
import { MenuItem, ListItemIcon } from "@mui/material";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import Face6Icon from "@mui/icons-material/Face6";
import { Logo } from "./LogoButton";
import { SigninButton } from "./SigninButton";
import { LogoutButton } from "./LogoutButton";
import { ProfileButton } from "./ProfileButton";
import axios from "axios";
import { authProvider } from "../providers/authPovider";
import { API_URL } from "../consts";
import Cookies from "universal-cookie";
import { getJwtTokenFromCookies, parseJwtTokenFromHeaders } from "../providers/authUtils";

const cookies = new Cookies();

export const MyAppBar = () => {
  const [user, setUser] = React.useState(null);
  const isAuthenticated = useAuthenticated();

  console.log("------" + getJwtTokenFromCookies());
  // console.log("******" + parseJwtTokenFromHeaders());

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/info`, {
          withCredentials: true, // Send cookies with the request
        });
        setUser(response.data); // Assuming your backend provides user information at this endpoint
      } catch (error) {
        // Handle error fetching user info
        console.error("Error fetching user info:", error);
      }
    };

    if (isAuthenticated) {
      fetchUserInfo(); 
    }
  }, [isAuthenticated]);

  return (
    <AppBar
      color="inherit"
      sx={{ p: 0 }}
      userMenu={
        isAuthenticated ? (
          <UserMenu>
            <MenuItem>
              <ListItemIcon>
                <ContactPageIcon fontSize="small" />
              </ListItemIcon>
              <ProfileButton user={user} /> {/* Pass user data to ProfileButton */}
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Face6Icon fontSize="small" />
              </ListItemIcon>
              <LogoutButton />
            </MenuItem>
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
