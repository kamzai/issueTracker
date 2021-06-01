import React, { useState, useEffect } from 'react'
import { withRouter, NavLink, useLocation, useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import { List, ListItem, ListItemText, Drawer, AppBar, Button } from '@material-ui/core'
import { CssBaseline, Toolbar, Typography, Icon } from '@material-ui/core'
import PersonIcon from "@material-ui/icons/Person";

import useStyle from './Styles'
import routeList from '../../routes'
import image from "../../image/sidebar.jpg"
import logo from "../../image/reactlogo.png"

const SideBar = () => {
    const classes = useStyle();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const [userDetail, setUserDetail] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(()=>{
        setUserDetail(JSON.parse(localStorage.getItem('profile')))
    }, [])

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        history.push('/auth')
        setUserDetail(null);
    }

    useEffect(() => {
        const webToken = userDetail?.token

        if (webToken) {
            const decodedToken = decode(webToken);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setUserDetail(JSON.parse(localStorage.getItem('profile')))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    // const logoText = userDetail?.result.userName

    function isActiveRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1 ? true : false;
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap className={classes.content}>
                        Track ~ Eit
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer className={`${classes.drawer} ${classes.drawerPaper}`} variant="permanent" >
                {/* <Toolbar /> */}
                <div className={classes.logo}>
                    <a href="/" className={classes.logoLink} >
                        <div className={classes.logoImage}>
                            <img src={logo} alt="logo" className={classes.img} />
                        </div>
                        {userDetail ? userDetail?.result.userName : 'LOGIN'}
                    </a>
                </div>
                <div className={classes.sidebarWrapper}>
                    <List className={classes.list} >
                        {routeList.map((item, index) => {
                            const { name, path, type, Itemicon } = item;
                            if (isActiveRoute(type)) {
                                return (
                                    <NavLink className={classes.item} to={path} key={index}>
                                        <ListItem button className={`${classes.itemLink} ${classes.highlight}`}  >

                                            {typeof Itemicon === "string" ? (
                                                <Icon className={classes.itemIcon} >
                                                    {Itemicon}
                                                </Icon>
                                            ) : (
                                                <Itemicon className={classes.itemIcon} />
                                            )}
                                            <ListItemText primary={name} className={classes.itemText} />
                                        </ListItem>
                                    </NavLink>
                                )
                            } else {
                                return (
                                    <NavLink className={classes.item} to={path} key={index}>
                                        <ListItem button className={classes.itemLink} >
                                            {typeof Itemicon === "string" ? (
                                                <Icon className={classes.itemIcon} >
                                                    {Itemicon}
                                                </Icon>
                                            ) : (
                                                <Itemicon className={classes.itemIcon} />
                                            )}
                                            <ListItemText primary={name} className={classes.itemText} />
                                        </ListItem>
                                    </NavLink>
                                )
                            }
                        })}

                        {userDetail && <Button className={`${classes.down} + ${classes.item}`} onClick={logout}>
                            
                                <PersonIcon className={classes.itemIcon} />
                                LOGOUT
                        </Button>}

                    </List>
                </div>
                <div
                    className={classes.background}
                    style={{ backgroundImage: "url(" + image + ")" }}
                />
            </Drawer>
        </div>
    )
}

export default withRouter(SideBar)
