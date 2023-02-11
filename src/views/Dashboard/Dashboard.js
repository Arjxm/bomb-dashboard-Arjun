import React, {useEffect, useMemo, useRef} from 'react';
import moment from "moment/moment";
import Page from "../../components/Page";

import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import BombfarmsContent from "./components/BombfarmsContent";
import useTotalValueLocked from "../../hooks/useTotalValueLocked";
import useCurrentEpoch from "../../hooks/useCurrentEpoch";
import useTreasuryAllocationTimes from "../../hooks/useTreasuryAllocationTimes";
import ProgressCountdown from "../Boardroom/components/ProgressCountdown";
import useCashPriceInEstimatedTWAP from "../../hooks/useCashPriceInEstimatedTWAP";
import CardContainer from "./components/CardContainer";
import useBombStats from "../../hooks/useBombStats";
import usebShareStats from "../../hooks/usebShareStats";
import useBondStats from "../../hooks/useBondStats";
import useBombFinance from "../../hooks/useBombFinance";
//Background image
import DashImage from '../../assets/img/dash-background.svg';

//Style
import styled, {createGlobalStyle} from "styled-components";
import {
    Avatar,
    Box,
    Button,
    CardContent,
    CardHeader,
    Grid,
    Paper,
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@material-ui/core";
import OutlineButton from "./components/OutlineButton";

//Icons
import bomb from '../../assets/img/bbond-256.png';
import bombIcon from '../../assets/img/bomb-icon.png';
import discordIcon from '../../assets/img/discordIcon.png';
import readDocsIcon from '../../assets/img/ReadDoc.png';
import bombBitcoin from "../../assets/img/bomb-bitcoin-LP.png";
import upIcon from "../../assets/img/Icon-arrow-up-circle.png";
import downIcon from "../../assets/img/Icon-arrow-down-circle.png";


const BackgroundImage = createGlobalStyle`
  body {
    background: url(${DashImage}) repeat !important;
    background-size: cover !important;
    background-color: #0C1125 !important;
  }
`;
const TITLE = 'bomb.money | Dashboard';
// function lastTWAP(value) {
//     const ref = useRef();
//     useEffect(() => {
//         ref.current = value;
//     });
//     return ref.current;
// }


const Dashboard = () => {
    const TVL = useTotalValueLocked();
    const currentEpoch = useCurrentEpoch();
    const cashStat = useCashPriceInEstimatedTWAP();
    const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
    const {to} = useTreasuryAllocationTimes();

    const lasttwap = scalingFactor;

    const bombStats = useBombStats();
    const bShareStats = usebShareStats();
    const tBondStats = useBondStats();
    const bombFinance = useBombFinance();


    const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
    const bombPriceInDollars = useMemo(
        () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
        [bombStats],
    );
    const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
    const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);
    const bombFinanceSummaryTable = [
        {
            name: "$BOMB",
            current: bombCirculatingSupply,
            total: bombTotalSupply,
            price: `$ ${bombPriceInDollars}${bombPriceInBNB}BTC`
        },
        {name: "$BSHARE", current: "5656", total: "32", price: '32'},
        {name: "$BBOND", current: "5656", total: "32", price: '32'},
    ]

    return (
        <>
            <Page>
                <Helmet>
                    <title>{TITLE}</title>
                </Helmet>
                <BackgroundImage/>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        {/*Bomb Finance Summary*/}
                        <Grid item xs={12}>
                            <CardContainer>
                                <Typography style={{color: '#ffffff', textAlign: 'center'}}>Bomb Finance
                                    Summary</Typography>
                                <StyledThinLine></StyledThinLine>

                                <Grid container spacing={2}>
                                    <Grid item xs={10}>
                                        <table style={{width: '50%', height: '100%'}}>
                                            <tr>
                                                <th></th>
                                                <th><small>Current supply</small></th>
                                                <th><small>Total supply</small></th>
                                                <th><small>Price</small></th>
                                            </tr>

                                            {bombFinanceSummaryTable.map(data => (
                                                <tr style={{textAlign: 'center'}}>
                                                    <td>{data.name}</td>
                                                    <td>{data.current}</td>
                                                    <td>{data.total}</td>
                                                    <td>{data.price}</td>
                                                </tr>
                                            ))}

                                        </table>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div style={{alignItems: 'end', textAlign: 'center', marginTop: '4px'}}>
                                            <Typography>Current Epoch</Typography>
                                            <Typography variant='h4'
                                                        style={{color: '#ffffff'}}>{Number(currentEpoch)}</Typography>
                                            <div style={{
                                                height: '0.5px',
                                                width: '100%',
                                                background: 'rgba(195, 197, 203, 0.75)'
                                            }}></div>
                                            <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to}
                                                               description="Next Epoch"/>
                                            <Typography>Next Epoch in</Typography>
                                            <div style={{
                                                height: '0.5px',
                                                width: '100%',
                                                background: 'rgba(195, 197, 203, 0.75)'
                                            }}></div>
                                            <Typography><small>Live TWAP:</small><small
                                                style={{color: '#00E8A2'}}>{scalingFactor}</small></Typography>
                                            <Typography><small>TVL:</small><small
                                                style={{color: '#00E8A2'}}>{'$'}{TVL}</small></Typography>
                                            <Typography><small>Last Epoch TWAP:</small><small
                                                style={{color: '#00E8A2'}}>{lasttwap}</small></Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContainer>
                        </Grid>
                        {/*Bomb Finance Summary*/}

                        {/*Boardroom Section*/}
                        <Grid item xs={7}>

                            {/*Boardroom Button, Link*/}
                            <Link to='/'><Typography
                                style={{textAlign: 'end', textDecoration: 'underline', color: '#9EE6FF'}}>Read
                                Investment Strategy{'>'}</Typography></Link>
                            <StyledDashInvestNowBtn>
                                <Typography>Invest Now</Typography>
                            </StyledDashInvestNowBtn>
                            <Grid container spacing={2} style={{marginBottom: '4px'}}>
                                <Grid item xs={6}>
                                    <StyledCustomBtn>
                                        <img style={{background: '#ffffff', borderRadius: '62px', marginRight: '12px'}}
                                             src={discordIcon}/>
                                        <Typography>Chat on Discord</Typography>
                                    </StyledCustomBtn>

                                </Grid>
                                <Grid item xs={6}>
                                    <StyledCustomBtn>
                                        <img style={{
                                            background: '#ffffff',
                                            borderRadius: '62px',
                                            marginRight: '12px',
                                            padding: '3px'
                                        }} src={readDocsIcon}/>
                                        <Typography>Read Docs</Typography>
                                    </StyledCustomBtn>
                                </Grid>
                            </Grid>
                            {/*Boardroom Button, Link*/}
                            {/*Boardroom*/}
                            <CardContainer>
                                <StyledWrapper>
                                    <StyledWrapper>
                                        <img src={bombBitcoin} style={{width: '32px'}}/>
                                        <Typography
                                            style={{marginLeft: '6px', marginRight: '6px'}}>BOMB-BTCB </Typography>
                                        <Tag>
                                            <Typography style={{
                                                fontSize: '12px',
                                                fontWeight: 'bolder'
                                            }}>Recommended</Typography>
                                        </Tag>
                                    </StyledWrapper>

                                    <Typography>TVL:gsjhdgsjhgdjhsga</Typography>
                                </StyledWrapper>
                                <div style={{
                                    height: '0.5px',
                                    width: '95%',
                                    marginLeft: '32px',
                                    background: 'rgba(195, 197, 203, 0.75)'
                                }}></div>
                                <div style={{
                                    textAlign: 'end',
                                    display: 'flex',
                                    justifyContent: 'end',
                                    alignItems: 'center'
                                }}>
                                    <small>Total Stacked:</small>
                                    <img src={bombBitcoin} style={{width: '32px'}}/>
                                    <small>4563</small>
                                </div>

                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <small>Daily Returns:</small>
                                        <Typography>2%</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <small>Daily Returns:</small>
                                        <Typography>2%</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <small>Daily Returns:</small>
                                        <Typography>2%</Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <OutlineButton icon={upIcon} title={"Deposit"}/>

                                            </Grid>
                                            <Grid item xs={6}>
                                                <OutlineButton icon={downIcon} title={"Withdraw"}/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <OutlineButton icon={bombIcon} title={"Claim Rewards"}/>
                                            </Grid>
                                        </Grid>


                                    </Grid>
                                </Grid>
                            </CardContainer>
                            {/*Boardroom */}
                        </Grid>

                        {/*Latest News*/}
                        <Grid item xs={5}>
                            <CardContainer>
                                <div style={{height: '274px'}}>
                                    <Typography>Latest News</Typography>
                                </div>

                            </CardContainer>
                        </Grid>
                        {/*Latest News*/}

                        {/*Boardroom Section*/}

                        {/*Bomb Farms*/}
                        <Grid item xs={12}>
                            <CardContainer>
                                <StyledWrapper>
                                    <div>
                                        <Typography>Bomb Farms</Typography>
                                        <Typography><small> Stake your LP tokens in our farms to start earning
                                            $BSHARE</small></Typography>
                                    </div>
                                    <div>
                                        <OutlineButton icon={bombIcon} title={"Claim All"}/>
                                    </div>
                                </StyledWrapper>

                                <CardContent>
                                    <BombfarmsContent/>
                                </CardContent>

                            </CardContainer>
                        </Grid>
                        {/*Bomb Farms*/}

                        {/*Bonds*/}
                        <Grid item xs={12}>
                            <CardContainer>
                                <CardHeader
                                    avatar={<img src={bomb} style={{objectFit: 'contain', width: '42px'}}/>}
                                    title="Bonds"
                                    subheader="BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1"
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <span>Current Price: (Bomb)^2</span>
                                        <Typography>BBond = 6.2872 BTCB</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <span>Available to redeem: </span>
                                        <Typography>456</Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <div>
                                            <StyledWrapper>
                                                <div>
                                                    <Typography>Purchase BBond</Typography>
                                                    <Typography>Bomb is over peg</Typography>
                                                </div>
                                                <div>
                                                    <OutlineButton icon={bombIcon} title={"Claim All"}/>
                                                </div>
                                            </StyledWrapper>
                                            <StyledThinLine></StyledThinLine>
                                            <StyledWrapper>
                                                <div>
                                                    <Typography>Redeem Bomb</Typography>
                                                </div>
                                                <div>
                                                    <OutlineButton icon={bombIcon} title={"Claim All"}/>
                                                </div>
                                            </StyledWrapper>

                                        </div>
                                    </Grid>
                                </Grid>

                            </CardContainer>
                        </Grid>
                        {/*Bonds*/}
                    </Grid>
                </Box>

            </Page>
        </>
    );
};


const StyledDashboardTable = styled.table`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledDashInvestNowBtn = styled.button`
  background: radial-gradient(59345.13% 4094144349.28% at 39511.5% -2722397851.45%, rgba(0, 245, 171, 0.5) 0%, rgba(0, 173, 232, 0.5) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border: 0.5px solid rgba(228, 26, 26, 0.57);
  width: 100%;
  padding: 6px;
  font-size: 16px;
  font-weight: bolder;
  color: #ffffff;
  cursor: pointer;
  margin-bottom: 14px;
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledThinLine = styled.div`
  height: 0.5px;
  width: 100%;
  background: rgba(195, 197, 203, 0.75);
`
const StyledCustomBtn = styled.div`
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #728CDF;
`
const Tag = styled.div`
  padding: 2px 5px;
  background: rgba(0, 232, 162, 0.5);
  border-radius: 3px;
`

export default Dashboard;