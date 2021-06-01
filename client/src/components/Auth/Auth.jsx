import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { Avatar, Paper, Button, Typography, Container, Grid, FormControl, InputLabel, Select, MenuItem, Toolbar } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Input from './input';

import useStyle from "./styles"

import { signIn, signUp } from "../../action/auth"

const Auth = () => {
    const classes = useStyle();

    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();
    const [isSignup, setIsSignup] = useState(false);

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        role: 'none',
        password: '',
        confirmPassword: ''
    })

    const dispatch = useDispatch();


    const handleSubmit = (event) => {
        event.preventDefault();

        if (isSignup) {
            dispatch(signUp(userData, history))
        } else {
            dispatch(signIn(userData, history))
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prev) => { return ({ ...prev, [name]: value }) })
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const handleSwitchMode = () => {
        setUserData({ firstName: '', lastName: '', email: '', role: 'none', password: '', confirmPassword: '' })
        setIsSignup((prevIsSignup) => !prevIsSignup)
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Toolbar />
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>

                <form className={classes.form} onSubmit={handleSubmit} autoComplete='off' >
                    <Grid container spacing={3}>
                        {isSignup && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            </>
                        )}
                        <Input name='email' label='Email' handleChange={handleChange} type='email' />

                        {isSignup &&
                            <Input name='userName' label='UserName' handleChange={handleChange} />}
                        {isSignup &&
                            <FormControl style={{ paddingLeft: '20px', margin: '10px 0' }}>
                                <InputLabel style={{ paddingLeft: '20px' }} >Role</InputLabel>
                                <Select name={`role`} value={userData.role} onChange={handleChange}>
                                    <MenuItem value='none'>Select</MenuItem>
                                    <MenuItem value='manager'>Manager</MenuItem>
                                    <MenuItem value='developer'>Developer</MenuItem>
                                    <MenuItem value='client'>Client</MenuItem>
                                </Select>
                            </FormControl>}

                        {isSignup && 
                            <div>
                                
                            </div>
                        }

                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' />}
                    </Grid>

                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <Grid container className={classes.switchContainer}>
                        <Grid item>
                            <Button onClick={handleSwitchMode} className={classes.switchButton}>
                                {isSignup ? 'Already have an account' : 'New User'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
