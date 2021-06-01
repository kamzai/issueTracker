import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { InputLabel, MenuItem, FormControl, Select, Toolbar, Grid, TextField, Button, Divider } from "@material-ui/core";
import { CircularProgress,Typography, IconButton } from '@material-ui/core';
import FileBase from "react-file-base64"
import AddCircleOutlineRounded from '@material-ui/icons/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import useStyle from './Styles'
import ProjectCard from './ProjectCard/ProjectCard'
import { createProject, fetchProjectList, updateProject } from '../../action/project';
import { fetchUsers } from '../../action/auth';

const Project = () => {

    const classes = useStyle();
    const dispatch = useDispatch();
    const location = useLocation();

    const [userDetail, setUserDetail] = useState(JSON.parse(localStorage.getItem('profile')))
    const { userList } = useSelector((store) => store?.auth)
    
    useEffect(() => {
        setUserDetail(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    useEffect(()=>{
        dispatch(fetchUsers())
        dispatch(fetchProjectList())

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetail])
    
    const { projectList, projectLoading} = useSelector((store) => store?.project)

    const [projectDetails, setProjectDetails] = useState({
        projectName: '',
        creatorName: userDetail.result.userName,
        creatorFName: userDetail.result.FName,
        creatorLName: userDetail.result.LName,
        creatorEmail: userDetail.result.email,
        startDate: '',
        targetEndDate: '',
        actualEndDate: '',
        status: 'none',
        description: '',
        teamSize: '',
        teamMembers: [],
        selectedFile: ''
    })

    const [searchQuery, setSearchQuery] = useState({
        name: '',
        creator: '',
        status: 'none'
    })

    const [currentId, setCurrentId] = useState(null);
    const oldProjectDetails = useSelector((store) => { return (currentId ? store?.project.projectList.find((p) => { return p._id === currentId }) : null) })

    useEffect(() => {
        if (oldProjectDetails) {

            const stDate = oldProjectDetails.startDate.substring(0, 10);
            const tgDate = oldProjectDetails.targetEndDate.substring(0, 10);

            setProjectDetails({ ...oldProjectDetails, startDate: stDate, targetEndDate: tgDate });
        }
        // eslint-disable-next-line
    }, [currentId])


    const handleSearchQuery = () => {
        setSearchQuery({
            name: '',
            creator: '',
            status: 'none'
        })
    }

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery((prev) => { return ({ ...prev, [name]: value }) })
    }

    const handleAddSubmit = (event) => {
        event.preventDefault();

        if (currentId) {
            dispatch(updateProject(currentId, projectDetails));
        } else {
            dispatch(createProject(projectDetails))
        }

        clearProjectdata()

        window.location.reload()

        dispatch(fetchProjectList())

    }

    const handleAddChange = (event) => {
        const { name, value } = event.target;
        const data = { 
            ...projectDetails, 
            [name]: value,  }

        setProjectDetails(data)
    }

    const clearProjectdata = () => {
        setProjectDetails({
            projectName: '',
            creatorName: 'kamran',
            creatorFName: 'kamran',
            creatorLName: 'Hussain',
            creatorEmail: 'kamran@gmail.com',
            startDate: '',
            targetEndDate: '',
            actualEndDate: '',
            status: 'none',
            description: '',
            teamSize: '',
            teamMembers: [],
            selectedFile: ''
        })

        setCurrentId(null)
    }

    const handleAddMember = () => {
        const values = [...projectDetails.teamMembers];
        values.push({ userName: 'none' });
        setProjectDetails({ ...projectDetails, teamMembers: values, teamSize: values.length });
    }

    const handleRemoveMember = (idx) => {
        const values = [...projectDetails.teamMembers];
        values.splice(idx, 1);
        setProjectDetails({ ...projectDetails, teamMembers: values, teamSize: values.length });
    }

    const handleMemberName = (idx, event) => {
        const values = [...projectDetails.teamMembers];
        values[idx].userName = event.target.value;
        setProjectDetails({ ...projectDetails, teamMembers: values, teamSize: values.length });
    }



    return (

        <main className={classes.container}>
            <Toolbar />
            <div className={classes.content}>

                {userDetail && userDetail.result.role === 'manager' &&
                    <div>

                        <div className={classes.card}>
                            <form autoComplete="off" className={classes.form} onSubmit={handleAddSubmit}>
                                <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`} style={!currentId ? { background: `linear-gradient(60deg, #43a047, #43a447)` } : { background: `linear-gradient(60deg, #9c27b0, #ab47bc)` }} >
                                    <Typography className={classes.heading}>{!currentId ? 'Add a Project' : 'Update a Project'} </Typography>
                                </div>
                                <div className={classes.cardBody}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12} md={12} xl={7} lg={7}>
                                            <TextField required label="Project Name" fullWidth name={'projectName'} value={projectDetails.projectName} onChange={handleAddChange} />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} xl={2} lg={2}>
                                            <TextField required label="Username" fullWidth value={userDetail.result.userName} disabled />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} xl={3} lg={3}>
                                            <TextField required label="Email address" fullWidth value={userDetail.result.email} disabled />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
                                            <TextField required label="First Name" fullWidth value={userDetail.result.FName} disabled />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
                                            <TextField required label="Last Name" fullWidth value={userDetail.result.LName} disabled />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>

                                            <TextField
                                                type="date"
                                                required
                                                label="Start Date"
                                                fullWidth
                                                name={`startDate`}
                                                value={projectDetails.startDate}
                                                onChange={handleAddChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />

                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>

                                            <TextField
                                                type="date"
                                                required label="Target End Date" fullWidth
                                                name={`targetEndDate`}
                                                value={projectDetails.targetEndDate}
                                                onChange={handleAddChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />

                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>
                                            <FormControl style={{ minWidth: '150px' }}>
                                                <InputLabel>Status</InputLabel>
                                                <Select name={`status`} value={projectDetails.status} onChange={handleAddChange}>
                                                    <MenuItem value={'none'}>Select</MenuItem>
                                                    <MenuItem value={`active`}>Active</MenuItem>
                                                    <MenuItem value={`end`}>Finished</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>

                                            <FileBase
                                                type="file"
                                                multiple={false}
                                                onDone={({ base64 }) => setProjectDetails({ ...projectDetails, selectedFile: base64 })} />

                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                                            <TextField required label="Description" fullWidth multiline rows={5} name={`description`} value={projectDetails.description} onChange={handleAddChange} />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} xl={3} lg={3}>
                                            <span style={{ marginRight: '20px', fontSize: '20px' }}>Team Size {projectDetails.teamMembers.length}</span>
                                            <IconButton onClick={handleAddMember} style={{ transform: 'scale(1.5)', }}>
                                                <AddCircleOutlineRounded />
                                            </IconButton>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} xl={9} lg={9}>
                                            <Grid container direction={'column'}>
                                                {projectDetails.teamMembers.map((field, idx) => {
                                                    return (
                                                        <div key={`${field}-${idx}`}>

                                                            <Grid item style={{ marginBottom: '10px' }}>
                                                                <FormControl style={{ minWidth: '150px' }}>
                                                                    <InputLabel>Member</InputLabel>
                                                                    <Select value={field.userName} onChange={e => handleMemberName(idx, e)}>
                                                                        <MenuItem value={'none'}>Select</MenuItem>
                                                                        {userList.map((user, index) => {
                                                                            return ( (user.role !== 'client') ? <MenuItem key={index} value={user.userName}>{user.userName}</MenuItem> : null)
                                                                        })}
                                                                    </Select>
                                                                </FormControl>
                                                                <IconButton onClick={() => handleRemoveMember(idx)}>
                                                                    <RemoveCircleOutlineRoundedIcon />
                                                                </IconButton>
                                                            </Grid>
                                                        </div>
                                                    );
                                                })}
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </div>
                                <Grid container justify='flex-end'>

                                    <Grid item>
                                        <div className={classes.cardFooter}>
                                            <Button className={classes.button} size="large" style={{ backgroundColor: `#f44336`, }} onClick={clearProjectdata}>
                                                Clear
                                    </Button>
                                        </div>
                                    </Grid>

                                    <Grid item>
                                        <div className={classes.cardFooter}>
                                            <Button type='submit' className={classes.button} size="large" style={!currentId ? { backgroundColor: `#43a047`, } : { backgroundColor: `#9c27b0`, }}>
                                                {!currentId ? 'Get started' : 'Update'}
                                            </Button>
                                        </div>
                                    </Grid>

                                </Grid>
                            </form>
                        </div>

                        <Divider />
                        
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
                                                        Clear
                                    </Button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Toolbar />

                                <Grid container spacing={3}>
                                    
                                    {projectList?.length !== 0 ? projectList?.map((project) => {

                                        if(searchQuery.status !== 'none' || searchQuery.creator !== '' || searchQuery.name !== '') {

                                            return (
                                                (project.status === searchQuery.status || project.projectName === searchQuery.name || project.creatorName === searchQuery.creator) ?
                                                <Grid key={project._id} xs={12} sm={12} md={4} lg={3} xl={3} item style={{ display: 'flex' }}>
                                                    <ProjectCard projectDetails={project} setCurrentId={setCurrentId} />
                                                </Grid> : null
                                            )

                                        } else {

                                            return (
                                                <Grid key={project._id} xs={12} sm={12} md={4} lg={3} xl={3} item style={{ display: 'flex' }}>
                                                    <ProjectCard projectDetails={project} setCurrentId={setCurrentId} />
                                                </Grid> 
                                            )

                                        }
                                    }) : null}
                                </Grid>
                            </div>
                        </div>}

                    </div>}

            </div >
        </main >


    );
}

export default Project
