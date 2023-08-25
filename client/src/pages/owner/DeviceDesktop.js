//client/owner/Desktop.js
import * as React from 'react';
import {
    Container,
    useMediaQuery,
    Box,
    Typography
} from '@mui/material';

import { MyBar } from '../../components/Drawer';
import { deviceItemData } from '../../assets/static/mockData/device.mockData';
import { CustomImageList } from '../../components/ImageList';
import { HomeRedirectButton } from '../../components/HomeRedirectButton';

export const DeviceDesktop = () => {
    const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isLgScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));

    return (
        <Box sx={{
            display: 'flex', justifyContent: "space-around",
            alignItems: "center"
        }}>
            {!isLgScreen && <MyBar />}
            <Container sx={{ m: 'auto' }}>
                <Typography
                    variant="h3"
                    sx={{
                        color: '#004417',
                        fontFamily: 'Roboto',
                        my: 5,
                        ml: '20%'
                    }} >
                    Choose type of device
                </Typography>
                <CustomImageList data={deviceItemData} />
            </Container>
            <HomeRedirectButton pageName="OwnerPage" title = "home"/>
        </Box>
    );
}

