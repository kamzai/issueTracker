import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { InputLabel, MenuItem, FormControl, Select, Toolbar, Grid, TextField, Button } from "@material-ui/core";
import { CircularProgress, Typography } from '@material-ui/core';
import useStyle from './Styles'
import ProjectCard from '../Project/ProjectCard/ProjectCard'
import { fetchProjectList } from '../../action/project';

const Issue = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const location = useLocation();

    const [userDetail, setUserDetail] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(() => {
        setUserDetail(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const [searchQuery, setSearchQuery] = useState({
        name: '',
        creator: '',
        status: 'none'
    })

    // eslint-disable-next-line 
    const [currentId, setCurrentId] = useState(null);

    useEffect(()=>{
        dispatch(fetchProjectList())

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetail])

    const { projectList, projectLoading } = useSelector((store) => store?.project)

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery((prev) => { return ({ ...prev, [name]: value }) })
    }

    const handleSearchQuery = () => {
        console.log(searchQuery)
        setSearchQuery({
            name: '',
            creator: '',
            status: 'none'
        })
    }
    return (
        <main className={classes.container}>
            <Toolbar />
            <div className={classes.content}>

                {userDetail &&
                    <div>
                        {projectLoading ? <CircularProgress /> : 
                        <div className={classes.card} style={{ marginTop: '20px' }}>
                            <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`} style={{ background: `linear-gradient(60deg, #ff9800, #ff9000)` }} >
                                <Typography className={classes.heading}> Search </Typography>
                            </div>
                            <div className={classes.cardBody}>
                                <Toolbar />
                                <Grid container spacing={3} >
                                    <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>
                                        <TextField
                                            autoComplete='off'
                                            name='name'
                                            label={'Search Project'}
                                            style={{ marginLeft: '10px' }}
                                            value={searchQuery.name}
                                            variant='outlined'
                                            fullWidth
                                            onChange={handleSearchChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>
                                        <TextField
                                            autoComplete='off'
                                            name='creator'
                                            label={'Search Creator'}
                                            style={{ marginLeft: '10px' }}
                                            value={searchQuery.creator}
                                            variant='outlined'
                                            fullWidth
                                            onChange={handleSearchChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={2} xl={2} lg={2}>
                                        <FormControl fullWidth>
                                            <InputLabel>Status</InputLabel>
                                            <Select name={`status`} value={searchQuery.status} onChange={handleSearchChange}>
                                                <MenuItem value='none'>None</MenuItem>
                                                <MenuItem value={`active`}>Active</MenuItem>
                                                <MenuItem value={`end`}>Finished</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={2} xl={2} lg={2}>
                                        <Grid container justify='flex-end'>
                                            <Grid item>
                                                <div className={classes.cardFooter}>
                                                    <Button className={classes.button} size="large" style={{ backgroundColor: `#ff9800`, }} onClick={handleSearchQuery}>
                                                        Search
                                    </Button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Toolbar />

                                <Grid container spacing={3}>

                                    {projectList?.length !== 0 ? projectList?.map((project) => {

                                        if (searchQuery.status !== 'none' || searchQuery.creator !== '' || searchQuery.name !== '') {

                                            return (
                                                (project.status === searchQuery.status || project.projectName === searchQuery.name || project.creatorName === searchQuery.creator) ?
                                                    <Grid key={project._id} xs={12} sm={12} md={4} lg={3} xl={3} item style={{ display: 'flex' }}>
                                                        <ProjectCard projectDetails={project} setCurrentId={setCurrentId} issue={true}/>
                                                    </Grid> : null
                                            )

                                        } else {

                                            return (
                                                <Grid key={project._id} xs={12} sm={12} md={4} lg={3} xl={3} item style={{ display: 'flex' }}>
                                                    <ProjectCard projectDetails={project} setCurrentId={setCurrentId} issue={true}/>
                                                </Grid>
                                            )

                                        }
                                    }) : null}
                                </Grid>
                            </div>
                        </div>}

                        


                    </div>}
            </div>
        </main>
    )
}

export default Issue
