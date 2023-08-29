import React from 'react';
import { Container, useMediaQuery } from "@mui/material";
import { MyBar } from "../../components/Drawer";
import { SelectsGroup } from '../../components/SelectsGroup';


export const DeviceStatisticPage = () => {
    const isLgScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));

    return (
        <div style={{ display: 'flex' }}>

            {!isLgScreen && <MyBar />}
            <Container>
                
                < SelectsGroup/>
                
            </Container>
        </div>

    );
}