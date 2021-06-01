import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import { Toolbar, Grid, Divider, ListItem, ListItemIcon } from '@material-ui/core'
import ChartistGraph from 'react-chartist'
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import Store from "@material-ui/icons/Store";
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import Accessibility from "@material-ui/icons/Accessibility";

import useStyle from './Styles'
import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart,
    issueChart,
} from "./charts";

const Dashboard = () => {
    const classes = useStyle();

    const location = useLocation();

    const [userDetail, setUserDetail] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(()=>{
        setUserDetail(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    

    const assignedIssues = ['Solve Bug', 'Fix indentation', 'Documentation'];
    const totalProject = 50
    const activeIssues = 75
    const remainigIssues = 25
    const follower = 225

    return (
    
        <main className={classes.container}>
            <Toolbar />
            <div className={classes.content}>
                {userDetail &&
                <Grid container direction='column' spacing={9} >
                    <Grid item>
                        <Grid container className={classes.gridContaiiner} justify='flex-start' spacing={4}>

                            <Grid item className={classes.gridItem} xs={12} sm={12} md={12} xl={3} lg={3}>
                                <div className={classes.card}>
                                    <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`} style={{ background: `linear-gradient(60deg, #43a047, #43a047)` }} >
                                        <AccountBalanceWalletOutlinedIcon className={classes.icon} />
                                    </div>

                                    <Divider style={{ marginTop: '20px' }} />

                                    <p style={{ fontFamily: '"Roboto Condensed"', position: 'absolute', paddingLeft: '55%', fontSize: '1.8em', color: '#999' }}>Revenue</p>

                                    <Grid container justify='flex-end'>
                                        <Grid item>
                                            <p style={{ fontFamily: '"Roboto Condensed"', fontSize: '1.5em', marginRight: '10px', color: '#000' }}>$40,567</p>
                                        </Grid>
                                    </Grid>

                                </div>
                            </Grid>

                            <Grid item className={classes.gridItem} xs={12} sm={12} md={12} xl={3} lg={3}>
                                <div className={classes.card}>
                                    <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`} style={{ background: `linear-gradient(60deg, #ff9800, #ff9800)` }}>
                                        <Store className={classes.icon} />
                                    </div>

                                    <Divider style={{ marginTop: '20px' }} />

                                    <p style={{ fontFamily: '"Roboto Condensed"', position: 'absolute', paddingLeft: '55%', fontSize: '1.8em', color: '#999' }}>Projects</p>

                                    <Grid container justify='flex-end'>
                                        <Grid item>
                                            <p style={{ fontFamily: '"Roboto Condensed"', fontSize: '1.5em', marginRight: '10px', color: '#000' }}>{totalProject}</p>
                                        </Grid>
                                    </Grid>

                                </div>
                            </Grid>

                            <Grid item className={classes.gridItem} xs={12} sm={12} md={12} xl={3} lg={3}>
                                <div className={classes.card}>
                                    <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`} style={{ background: `linear-gradient(60deg, #f44336, #f44336)` }}>
                                        <ErrorIcon className={classes.icon} />
                                    </div>

                                    <Divider style={{ marginTop: '20px' }} />

                                    <p style={{ fontFamily: '"Roboto Condensed"', position: 'absolute', paddingLeft: '55%', fontSize: '1.8em', color: '#999' }}>Issues</p>

                                    <Grid container justify='flex-end'>
                                        <Grid item>
                                            <p style={{ fontFamily: '"Roboto Condensed"', fontSize: '1.5em', marginRight: '10px', color: '#000' }}>{activeIssues}</p>
                                        </Grid>
                                    </Grid>

                                </div>
                            </Grid>

                            <Grid item className={classes.gridItem} xs={12} sm={12} md={12} xl={3} lg={3}>
                                <div className={classes.card}>
                                    <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`} style={{ background: `linear-gradient(60deg, #00d3ee, #00d3ee)` }}>
                                        <Accessibility className={classes.icon} />
                                    </div>

                                    <Divider style={{ marginTop: '20px' }} />

                                    <p style={{ fontFamily: '"Roboto Condensed"', position: 'absolute', paddingLeft: '55%', fontSize: '1.8em', color: '#999' }}>Follower</p>

                                    <Grid container justify='flex-end'>
                                        <Grid item>
                                            <p style={{ fontFamily: '"Roboto Condensed"', fontSize: '1.5em', marginRight: '10px', color: '#000' }}>{follower}</p>
                                        </Grid>
                                    </Grid>

                                </div>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item>

                        <Grid container className={classes.gridContaiiner} justify='flex-start' spacing={9}>

                            <Grid item className={classes.gridItem} xs={12} sm={12} md={12} xl={4} lg={4}>
                                <div className={classes.card}>
                                    <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`} style={{ background: `linear-gradient(60deg, #43a047, #43a447)`, width: '92%' }}>
                                        <ChartistGraph
                                            className={`${classes.graphStyle}`}
                                            data={dailySalesChart.data}
                                            type="Line"
                                            options={dailySalesChart.options}
                                            style={{ color: '#fff' }}
                                        />
                                    </div>

                                    <Grid container justify='flex-start'>
                                        <Grid item>
                                            <p className={classes.cardBody} style={{ fontSize: '25px', color: '#999' }}>Issues Fixed</p>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <Grid container justify='flex-end'>
                                        <Grid item>
                                            <p className={classes.cardBody} style={{ fontSize: '24px' }}>{activeIssues}</p>
                                        </Grid>
                                    </Grid>

                                </div>
                            </Grid>

                            <Grid item className={classes.gridItem} xs={12} sm={12} md={12} xl={4} lg={4}>
                                <div className={classes.card}>
                                    <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`} style={{ background: `linear-gradient(60deg, #ff9800, #ff9000)`, width: '92%', }}>
                                        <ChartistGraph
                                            className={classes.graphStyle}
                                            data={emailsSubscriptionChart.data}
                                            type="Bar"
                                            options={emailsSubscriptionChart.options}
                                            responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                                        />
                                    </div>

                                    <Grid container justify='flex-start'>
                                        <Grid item>
                                            <p className={classes.cardBody} style={{ fontSize: '25px', color: '#999' }}>Email Subscriptions</p>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <Grid container justify='flex-end'>
                                        <Grid item>
                                            <p className={classes.cardBody} style={{ fontSize: '24px' }}>{follower}</p>
                                        </Grid>
                                    </Grid>

                                </div>
                            </Grid>

                            <Grid item className={classes.gridItem} xs={12} sm={12} md={12} xl={4} lg={4}>
                                <div className={classes.card}>
                                    <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`} style={{ background: `linear-gradient(60deg, #f44336, #f44336)`, width: '92%' }}>
                                        <ChartistGraph
                                            className={classes.graphStyle}
                                            data={completedTasksChart.data}
                                            type="Line"
                                            options={completedTasksChart.options}
                                        />
                                    </div>

                                    <Grid container justify='flex-start'>
                                        <Grid item>
                                            <p className={classes.cardBody} style={{ fontSize: '25px', color: '#999' }}>Issues Remaining</p>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <Grid container justify='flex-end'>
                                        <Grid item>
                                            <p className={classes.cardBody} style={{ fontSize: '24px' }}>{remainigIssues}</p>
                                        </Grid>
                                    </Grid>

                                </div>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item >

                        <Grid container className={classes.gridContaiiner} justify='flex-start' spacing={9}>

                            <Grid item className={classes.gridItem} xs={12} sm={12} md={12} xl={4} lg={4}>
                                <div className={classes.card}>
                                    <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`} style={{ background: `linear-gradient(60deg, #9c27b0, #ab47bc)`, width: '92%' }}>
                                        <ChartistGraph
                                            className={`${classes.graphStyle}`}
                                            data={issueChart.data}
                                            type="Bar"
                                            options={issueChart.options}
                                            style={{ color: '#fff' }}
                                        />
                                    </div>

                                    <Grid container justify='flex-start'>
                                        <Grid item>
                                            <p className={classes.cardBody} style={{ fontSize: '25px', color: '#999' }}>Issues Description</p>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <Grid container justify='flex-end'>
                                        <Grid item>
                                            <p className={classes.cardBody} style={{ fontSize: '24px' }}>{activeIssues}</p>
                                        </Grid>
                                    </Grid>

                                </div>
                            </Grid>

                            <Grid item className={classes.gridItem} xs={12} sm={12} md={12} xl={8} lg={8}>
                                <div className={classes.card}>
                                    <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`} style={{ background: `linear-gradient(60deg, #00acc1, #00bcc1)`, width: '92%' }}>
                                        <ListItem style={{ color: '#fff' }}>
                                            <ListItemIcon className={classes.icon} style={{ color: '#fff' }} ><Store /></ListItemIcon>
                                            <h3 style={{ fontFamily: '"Roboto Condensed"', paddingLeft: '70%', fontSize: '1.8em' }}>Activity</h3>
                                        </ListItem>
                                    </div>

                                    <Divider style={{ marginTop: '5%' }} />


                                    <Grid container alignItems="flex-end" direction='column'>
                                        {assignedIssues.map((issue, index) => {

                                            if (index < 5) {

                                                return(<Grid item key={index}>
                                                    <p className={classes.cardBody} style={{ fontSize: '24px' }}>{issue}
                                                    </p>
                                                </Grid>)
                                            } else {
                                                return null
                                            }
                                        }
                                        )}
                                    </Grid>

                                </div>
                            </Grid>

                        </Grid>
                    </Grid>

                </Grid>}
            
            </div>
        </main>
    )
}

export default Dashboard
