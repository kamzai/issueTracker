import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { Toolbar, Grid, ListItemText, TextField, Button } from '@material-ui/core'
import {useLocation, useHistory} from 'react-router-dom'
import {updateProfile} from '../../action/auth'
import useStyle from './Styles'

const Dashboard = () => {
    const classes = useStyle();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('profile')))

    const [profile, setProfile] = useState({
        id: userDetails.result._id,
        FName: userDetails.result.FName,
        LName: userDetails.result.LName,
        userName: userDetails.result.userName,
        email: userDetails.result.email,
        role: userDetails.result.role,
        address: '',
        country: '',
        city : '',
        postalCode: '',
        aboutMe: '',

    })

    useEffect(()=>{
        setUserDetails(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setProfile((prev) => {return({...prev, [name] : value})})
    }

    return (
        <main className={classes.container}>
            <Toolbar />
            <div className={classes.content}>
                {userDetails && 
                <Grid container className={classes.gridContaiiner} justify='flex-start'>
                    <Grid item className={classes.gridItem} xs={12} sm={12} md={12} xl={8} lg={8}>
                        
                        <div className={classes.card}>
                            
                            <form className={classes.form}>
                                <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`}>
                                    <ListItemText primary={'Edit Profile'} />
                                    <p>Complete Your Profile</p>
                                </div>
                                <div className={classes.cardBody}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12} md={12} xl={7} lg={7}>
                                            <TextField  label="Company" fullWidth defaultValue={`G Y M K H A N A - B O Y Z`}/>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} xl={2} lg={2}>
                                            <TextField  label="Username" fullWidth disabled defaultValue={userDetails.result.userName}/>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} xl={3} lg={3}>
                                            <TextField  label="Email address" fullWidth disabled defaultValue={userDetails.result.email}/>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
                                            <TextField  label="First Name" fullWidth disabled defaultValue={userDetails.result.FName}/>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
                                            <TextField  label="Last Name" fullWidth disabled defaultValue={userDetails.result.LName}/>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                                            <TextField  label="Address" fullWidth name={'address'} value={userDetails.result.address} onChange={handleChange}/>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>
                                            <TextField  label="Country" fullWidth name={'country'} value={userDetails.result.country} onChange={handleChange}/>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>
                                            <TextField  label="City" fullWidth name={'city'} value={userDetails.result.city} onChange={handleChange}/>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>
                                            <TextField  label="Postal Code" fullWidth name={'postalCode'} value={userDetails.result.postalCode} onChange={handleChange}/>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                                            <TextField  label="About Me" fullWidth multiline rows={5} name={'aboutMe'} value={userDetails.result.aboutMe} onChange={handleChange}/>
                                        </Grid>

                                    </Grid>
                                </div>
                                <Grid container justify='flex-end'>
                                    <Grid item>
                                        <div className={classes.cardFooter}>
                                            <Button className={classes.button} size="large" onClick={() => {
                                                dispatch(updateProfile(profile))
                                                history.push('/home/dashboard')
                                                // console.log(userDetails.result)
                                                // console.log(profile)
                                            }}>
                                                Update
                                                    </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Grid>
                </Grid>}
            </div>
        </main>
    )
}

export default Dashboard
