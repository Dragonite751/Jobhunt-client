import React from 'react';
import { Box, Container, Typography, List, ListItem, ListItemText, ListItemIcon, Link, Grid } from '@mui/material';

const Footer = () => {
    return (
        <footer className="bg-blue-800 text-white p-8 flex justify-between" style={{ marginTop: 'auto' }}>
            <Container maxWidth="xl" className='flex justify-between'>
                <Grid container spacing={4} className='flex justify-around'>
                    <Grid item xs={12} md={6} lg={4}>
                        <Box sx={{ color: 'white', lineHeight: '45px' }}>
                            <Typography variant="h6" className="font-bold">Contact us</Typography>
                            <List className="list-unstyled contact-info list ">
                                <ListItem>
                                    <ListItemIcon>
                                        <img src="https://nitw.ac.in/images/logo-170x172.png" alt="NITW Logo" width="120px" height="120px" />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography variant="body1" className="text-lg">Centre for Career Planning and Development (CCPD)</Typography>
                                        <Typography variant="body1" className="text-lg">National Institute of Technology, <br />Warangal - 506004, TS, INDIA</Typography>
                                        <Typography variant="body1" className="text-lg">
                                            <Link href="mailto:taps@nitw.ac.in" color="inherit">Email: taps@nitw.ac.in</Link>
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <div style={{ width: '100%' }}><iframe width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=National%20institute%20of%20Warangal+(Education)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps systems</a></iframe></div>
                    </Grid>

                </Grid>
            </Container>
        </footer>
    );
};

export default Footer;
