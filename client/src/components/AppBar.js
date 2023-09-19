//AppBar.js
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
import Theme from './Theme';
import { ThemeProvider } from "@mui/material/styles";

export const MyAppBar = () => {
//   const [isAuthenticated, setIsAuthenticated] = React.useState(true);

//   const handleLogout = () => {
//     setIsAuthenticated((prevIsAuthenticated) => !prevIsAuthenticated);
//   };
// useAuthenticated();
  return (
    <ThemeProvider theme={Theme}>
    <AppBar
      color="inherit"
      sx={{ p: 0 }}
      userMenu={
        // isAuthenticated ? (
          <UserMenu>
            <MenuItem>
              <ListItemIcon>
                <ContactPageIcon fontSize="small" />
              </ListItemIcon>
              <ProfileButton />
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Face6Icon fontSize="small" />
              </ListItemIcon>
              <LogoutButton />
            </MenuItem>
          </UserMenu>
        // ) : (
        //   false
        // )
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
      {/* {isAuthenticated ? null : <SigninButton />} */}
    </AppBar>
    </ThemeProvider>
  );
};
