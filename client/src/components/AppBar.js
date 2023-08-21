// // // //client/components/AppBar.js
import { Logo } from './Logo';

import { AppBar, TitlePortal, useAuthenticated } from 'react-admin';
import { SigninButton } from './SigninButton';
import { LogoutButton } from './LogoutButton';


import * as React from 'react';
import { UserMenu } from 'react-admin';
import { MenuItem, ListItemIcon } from '@mui/material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { ProfileButton } from './ProfileButton';
import Face6Icon from '@mui/icons-material/Face6';

// const SettingsMenuItem = React.forwardRef((props, ref) => {
//     const { onClose } = useUserMenu();
// };

export const MyAppBar = () => {

    //const isAuthenticated = useAuthenticated();

    //հետո ջնջել
    const [isAuthenticated, setIsAuthenticated] = React.useState(true); // Initialize to true or false based on your initial state

    const handleLogout = () => {
        setIsAuthenticated(prevIsAuthenticated => !prevIsAuthenticated); // Toggle isAuthenticated
    };
    //հետո ջնջել

    return (
        isAuthenticated ? <AppBar color='inherit' sx={{ p: 0 }}
            userMenu={
                <UserMenu>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <ContactPageIcon fontSize="small" />
                        </ListItemIcon>
                        <ProfileButton />
                    </MenuItem>
                    <MenuItem onClick={handleLogout} >
                        <ListItemIcon>
                            <Face6Icon fontSize="small" />
                        </ListItemIcon>
                        <LogoutButton />
                    </MenuItem>
                </UserMenu>
            }
        /> : <AppBar userMenu={false} color='inherit' sx={{ p: 0 }} >
            <Logo />
            <TitlePortal />
            <SigninButton />
        </AppBar>

    )

};
