import * as React from 'react';
import { styled, Grid, Box, Typography, Paper } from '@mui/material';

import dashBoardImg1 from '../assets/static/dashboardImg1.jpg'
import dashBoardImg2 from '../assets/static/dashboardImg2.jpg'


const Img1 = styled('img')({
    margin: 'auto',
    display: 'block',
    width: '60%',
    borderRadius: '50%'
});

const Img2 = styled('img')({
    margin: 'auto',
    display: 'block',
    width: '80%',
    borderRadius: '5%'


});
export const MainDashboard = () => {
    return (
        <>
            <Paper
                sx={{
                    p: 2,
                    m: 4,
                    maxWidth: '100%',
                    backgroundColor: '#F1FBF4'
                }}
            >
                <Grid container spacing={3} sx={{ p: 4 }}>
                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                height: 'auto',
                                width: '90%',
                                borderBottom: '1px solid #004417',
                                p: 4,
                                m: 4
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    color: '#004417',
                                    fontFamily: 'Roboto'
                                }} >
                                GreenHouse
                            </Typography>
                        </Box >
                        <Typography
                            sx={{
                                m: 4,
                                p: 4
                            }}>
                            Invest confidently in the agriculture industry. Explore our platform, find exciting farm investment opportunities, and
                            enjoy the benefits of a thriving sector. Start growing your wealth through agricultural investments today.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} container>
                        <Img1 alt="complex" src={dashBoardImg1} />

                    </Grid>
                </Grid>
            </Paper>
            <Paper
                sx={{
                    p: 2,
                    m: 4,
                    maxWidth: '100%',
                    backgroundColor: '#FFFFF'
                }}
            >
                <Grid container spacing={3} sx={{ p: 4 }}>
                    <Grid item xs={12} sm={12}>
                        <Typography
                            variant="h3"
                            sx={{
                                color: '#004417',
                                fontFamily: 'Roboto',
                                m: 3,
                                textAlign: 'center'
                            }} >
                            About Us
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ p: 5 }}>
                        <Img2 alt="complex" src={dashBoardImg2} />
                    </Grid>
                    <Grid item xs={12} sm={6} container>
                        <Typography
                            sx={{
                                m: 4,
                                p: 4
                            }}>
                            Real estate investment trusts (REITs) aren’t just for office buildings and apartment complexes. Indeed, REITs can also invest in farmland, and they’re a popular way for investors to enjoy the benefits of real estate investing – notably, income – without the headaches of management.
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

