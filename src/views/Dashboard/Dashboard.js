import React from 'react';
import Page from "../../components/Page";
import {createGlobalStyle} from "styled-components";
import {Helmet} from "react-helmet";

import CardContainer from "./components/CardContainer";

//Background image
import DashImage from '../../assets/img/dash-background.svg';

//Style

import {Avatar, Box, Button, CardContent, CardHeader, Grid, Paper, Typography} from "@material-ui/core";
import OutlineButton from "./components/OutlineButton";

//Icons
import bomb from '../../assets/img/bbond-256.png'

const Bomb = () => (
    <img src={bomb}/>
)


const BackgroundImage = createGlobalStyle`
  body {
    background: url(${DashImage}) repeat !important;
    background-size: cover !important;
    background-color: #0C1125 !important;
  }
`;
const TITLE = 'bomb.money | Dashboard';
const Dashboard = () => {

    return (
        <>
            <Page>
                <Helmet>
                    <title>{TITLE}</title>
                </Helmet>
                <BackgroundImage/>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <CardContainer>

                                <Typography style={{color: '#ffffff', textAlign: 'center'}}>Bomb Finance
                                    Summary</Typography>
                                <div style={{
                                    height: '0.5px',
                                    width: '100%',
                                    background: 'rgba(195, 197, 203, 0.75)'
                                }}></div>

                                <Grid container spacing={2}>
                                    <Grid item xs={8}>
                                        <table>
                                            <tr style={{borderBottom: '1px solid #ffffff'}}>
                                                <th></th>
                                                <th><small>Current supply</small></th>
                                                <th><small>Total supply</small></th>
                                                <th><small>Price</small></th>
                                                <th></th>
                                            </tr>
                                            <tr>
                                                <td>image</td>
                                                <td>8.66M</td>
                                                <td>60.9K</td>
                                                <td>$0.24 1.05BTC</td>
                                                <td>image</td>
                                            </tr>
                                        </table>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <div style={{alignItems: 'end'}}>
                                            <p>Current Epoch</p>
                                            <p>258</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContainer>
                        </Grid>

                        <Grid item xs={7}>
                            <Typography style={{textAlign: 'end'}}>Read Investment Strategy{'>'}</Typography>

                        </Grid>
                        <Grid item xs={5}>
                            <CardContainer>
                                <Typography>Latest News</Typography>
                            </CardContainer>
                        </Grid>
                        <Grid item xs={12}>
                            <CardContainer>

                            </CardContainer>
                        </Grid>
                        <Grid item xs={12}>
                            <CardContainer>
                                <CardHeader
                                    avatar={<img src={bomb} style={{objectFit: 'contain', width: '42px'}}/>}
                                    title="Bonds"
                                    subheader="BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1"
                                />

                            </CardContainer>
                        </Grid>
                    </Grid>
                </Box>

            </Page>
        </>
    );
};

export default Dashboard;