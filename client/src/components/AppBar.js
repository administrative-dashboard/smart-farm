// // //client/components/AppBar.js
import { Logo } from './Logo';
import * as React from 'react';
import { AppBar, TitlePortal, useAuthenticated } from 'react-admin';
import { SignupButton } from './SignupButton';
import { LogoutButton } from './LogoutButton';


export const MyAppBar = () => {
    //const isAuthenticated = useAuthenticated();
    const isAuthenticated = false;
    return (
        <AppBar userMenu={false} color='inherit' sx={{ p: 0 }} >
            <Logo />
            <TitlePortal />
            {isAuthenticated ? <LogoutButton /> : <SignupButton />}
        </AppBar>

    );
}

