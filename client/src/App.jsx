import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'


import Sidebar from "./components/Sidebar/Sidebar"
import basicRoute from "./routes"
import queryRoutes from './QueryRoutes'
import Auth from './components/Auth/Auth'
import ScrollToTop from './ScrollToTop'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}))

const App = () => {
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [])

    return (
        <div className={classes.root}>
            <BrowserRouter>
                {<Sidebar />}
                <ScrollToTop/>
                <Switch >
                    {basicRoute.map((prop, index) => {
                        return (
                            <Route
                                exact
                                path={prop.path}
                                component={prop.component}
                                key={index}
                            />
                        )
                    })}
                    {queryRoutes.map((prop, index) => {
                        return (
                            <Route
                                exact
                                path={prop.path}
                                component={prop.component}
                                key={index}
                            />
                        )
                    })}
                    <Route exact path='/auth' component={user ? <Redirect to='/'/> : <Auth/>}/>
                    <Redirect from='/' to={user? '/home/dashboard' : '/auth'} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
