import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import { CircularProgress, InputLabel, MenuItem, FormControl, Select, Toolbar, Grid, TextField, Button, Divider, Typography, Avatar } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { useParams, useHistory } from 'react-router-dom';

import { fetchProjectList, deleteProject } from '../../../action/project'
import { createIssue, fetchIssueList } from '../../../action/issue'
import useStyles from './Styles'

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ButtonBase } from '@material-ui/core'

const columns = [
    { id: 'projectName', label: 'Project Name', minWidth: 50 },
    { id: 'category', label: 'Category', minWidth: 50 },
    {
        id: 'priority',
        label: 'Priority',
        minWidth: 50,
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 50,
    },
    {
        id: 'summary',
        label: 'Summary',
        minWidth: 150,
        align: 'right',
    },
];

const createData = (projectName, category, priority, status, id, summary) => {
    return { projectName, category, priority, status, id, summary };
}

function isActiveRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
}

const ProjectDetails = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const userDetails = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        dispatch(fetchProjectList())
        dispatch(fetchIssueList())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const project = useSelector((store) => { return (id ? store?.project.projectList.find((p) => { return p._id === id }) : null) })

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState({
        name: '',
        category: 'none',
        status: 'none',
        priority: 'none',
    })


    const [showAddIssue, setShowAddIssue] = useState(false);
    const [issueDetails, setIssueDetails] = useState({
        projectId: id,
        projectName: '',
        reporterName: 'kamran',
        category: 'none',
        submitDate: new Date().toISOString().substring(0, 10),
        summary: '',
        details: '',
        attachments: [],
        status: 'none',
        priority: 'none',
        assignTo: 'none',
        assignToId: '',
    })

    const issue = isActiveRoute('issue');

    const { issueList, issueLoading } = useSelector((store) => store?.issue)
    const {projectLoading} = useSelector((store) => store?.project)


    const projectIssueList = issueList?.map((issue) => (issue.projectId === id ? issue : null))
    const rows = projectIssueList?.map((issue) => { return (createData(issue.projectName, issue.category, issue.priority, issue.status, issue._id, issue.summary)) });


    if (!project) {
        return (
            <h1>HO</h1>
        )
    }

    const stDate = project.startDate.substring(0, 10);
    const tgDate = project.targetEndDate.substring(0, 10);

    const projectDetails = {
        ...project,
        startDate: stDate,
        targetEndDate: tgDate
    }

    if (!projectDetails) {
        return (
            <h1>HO</h1>
        )
    }

    const projectDelete = () => {

        const result = window.confirm('Are You Sure\nAll the Isssues of the post will also be Deleted')
        if (result) {
            dispatch(deleteProject(id, history))
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery((prev) => { return ({ ...prev, [name]: value }) })
    };


    const handleSearchQuery = () => {
        // console.log(searchQuery)
        setSearchQuery({
            name: '',
            category: 'none',
            priority: 'none',
            status: 'none'
        })
    }

    const handleAddSubmitIssue = (event) => {
        event.preventDefault()
        setIssueDetails((prev) => { return ({ ...prev, 'projectName': projectDetails.projectName }) })

        dispatch(createIssue(issueDetails, history))
    }

    const handleIssueChange = (e) => {
        const { name, value } = e.target;
        setIssueDetails((prev) => { return ({ ...prev, [name]: value }) })
        setIssueDetails((prev) => { return ({ ...prev, 'projectName': projectDetails?.projectName }) })
    }

    const clearIssuedata = () => {
        setShowAddIssue(false)
        setIssueDetails({
            projectId: id,
            projectName: '',
            reporterName: 'kamran',
            category: 'none',
            submitDate: new Date().toISOString().substring(0, 10),
            summary: '',
            details: '',
            attachments: [],
            status: 'none',
            priority: 'none',
            assignTo: '',
        })
    }

    const colorCode = (data) => {
        switch (data) {
            case 'bug':
                return ({
                    backgroundColor: '#F59494',
                })
            case 'feature':
                return ({
                    backgroundColor: '#94F5AE',
                })
            case 'open':
                return ({
                    backgroundColor: '#FF58D1',
                })
            case 'progress':
                return ({
                    backgroundColor: '#58A6FF',
                })
            case 'closed':
                return ({
                    backgroundColor: '#D1FF58',
                })
            case 'low':
                return ({
                    backgroundColor: '#80FF58',
                })
            case 'medium':
                return ({
                    backgroundColor: '#FFC933',
                })
            case 'high':
                return ({
                    backgroundColor: '#FF8458',
                })

            default:
                return ({
                    backgroundColor: '',
                })
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <Toolbar />

                {projectLoading ? <CircularProgress/> : 
                <div className={classes.card}>
                    <form autoComplete="off" className={classes.form}>
                        <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`} style={!issue ? { background: `linear-gradient(60deg, #9c27b0, #ab47bc)` } : { background: `linear-gradient(60deg, #43a047, #43a447)` }} >
                            <Typography className={classes.heading}>{'Project Details'}
                            </Typography>
                            <Avatar className={classes.media} src={projectDetails.selectedFile} alt={projectDetails.projectName} style={{ marginLeft: '90%', marginBottom: '20px', transform: 'scale(1.5)' }} />
                        </div>
                        <div className={classes.cardBody}>
                            <Toolbar />
                            <Grid container spacing={3}>

                                <Grid item xs={12} sm={12} md={12} xl={7} lg={7}>
                                    <TextField label="Project Name" fullWidth value={projectDetails.projectName} disabled />
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} xl={2} lg={2}>
                                    <TextField label="Username" fullWidth defaultValue={projectDetails.creatorName} disabled />
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} xl={3} lg={3}>
                                    <TextField label="Email address" fullWidth defaultValue={projectDetails.creatorEmail} disabled />
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
                                    <TextField label="First Name" fullWidth defaultValue={projectDetails.creatorFName} disabled />
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
                                    <TextField label="Last Name" fullWidth defaultValue={projectDetails.creatorLName} disabled />
                                </Grid>

                                <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>

                                    <TextField
                                        type="date"
                                        label="Start Date"
                                        fullWidth
                                        value={projectDetails.startDate}
                                        disabled
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                </Grid>

                                <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>

                                    <TextField
                                        type="date"
                                        label="Target End Date"
                                        fullWidth
                                        value={projectDetails.targetEndDate}
                                        disabled
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                </Grid>

                                <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>
                                    <TextField label="Status" fullWidth defaultValue={projectDetails.status} disabled />
                                </Grid>


                                <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                                    <TextField label="Description" fullWidth value={projectDetails.description} disabled />
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} xl={3} lg={3}>
                                    <span style={{ marginRight: '20px', fontSize: '20px' }}>Team Size {projectDetails.teamMembers.length}</span>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} xl={9} lg={9}>
                                    <Grid container spacing={5}>
                                        {projectDetails.teamMembers.map((field, idx) => {
                                            return (
                                                <div key={`${field}-${idx}`}>
                                                    <Grid item style={{ marginBottom: '10px' }}>
                                                        <TextField
                                                            type="text"
                                                            label='Member'
                                                            value={field.userName || ""}
                                                            disabled
                                                        />
                                                    </Grid>
                                                </div>
                                            );
                                        })}
                                    </Grid>
                                </Grid>

                            </Grid>
                        </div>

                        {(userDetails.result.role === 'manager' || userDetails.result.role === 'developer') && 
                        <Grid container justify='flex-end'>

                            <Grid item>
                                {!issue ?
                                    <div className={classes.cardFooter}>
                                        <Button className={classes.button} size="large" style={{ backgroundColor: `#f44336`, }} onClick={projectDelete}>
                                            Delete
                                        <DeleteIcon fontSize='large' />
                                        </Button>
                                    </div>
                                    :
                                    <div className={classes.cardFooter}>
                                        <Button className={classes.button} size="large" style={{ backgroundColor: `#43a047`, }} onClick={() => setShowAddIssue(true)}>
                                            Add &nbsp; &nbsp;
                                        <PlaylistAddIcon fontSize='large' />
                                        </Button>
                                    </div>
                                }
                            </Grid>
                        </Grid>}

                    </form>
                </div>}

                <Divider />
                <Toolbar />


                {!showAddIssue ? null :
                    <div>
                        <div className={classes.card}>
                            <form autoComplete="off" className={classes.form} onSubmit={handleAddSubmitIssue}>
                                <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`} style={{ background: `linear-gradient(60deg, #f44336, #f44336)` }} >
                                    <Typography className={classes.heading}>{'Add a Issue'} </Typography>
                                </div>
                                <div className={classes.cardBody}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
                                            <TextField
                                                required
                                                label="Project Name"
                                                fullWidth
                                                name={'projectName'}
                                                value={issueDetails.projectName}
                                                disabled
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} xl={3} lg={3}>
                                            <TextField
                                                required
                                                label="Reporter"
                                                fullWidth
                                                defaultValue={issueDetails.reporterName}
                                                disabled
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} xl={3} lg={3}>
                                            <TextField
                                                required
                                                label="Email address"
                                                fullWidth
                                                defaultValue={'X@gmail.com'}
                                                disabled
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={3} xl={3} lg={3}>

                                            <TextField
                                                type="date"
                                                required
                                                label="Start Date"
                                                fullWidth
                                                name={`submitDate`}
                                                value={issueDetails.submitDate}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                disabled
                                            />

                                        </Grid>

                                        {userDetails.role !== 'client' &&
                                            <Grid item xs={12} sm={12} md={3} xl={3} lg={3}>
                                                <FormControl style={{ minWidth: '150px' }}>
                                                    <InputLabel>Category</InputLabel>
                                                    <Select
                                                        name={`category`}
                                                        value={issueDetails.category}
                                                        onChange={handleIssueChange}
                                                        disabled={!(userDetails.result.role === 'manager')}
                                                    >
                                                        <MenuItem value={'none'}>Select</MenuItem>
                                                        <MenuItem value={`bug`}>Bug</MenuItem>
                                                        <MenuItem value={`feature`}>Feature</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>}
                                        {userDetails.role !== 'client' &&
                                            <Grid item xs={12} sm={12} md={3} xl={3} lg={3}>
                                                <FormControl style={{ minWidth: '150px' }}>
                                                    <InputLabel>Status</InputLabel>
                                                    <Select
                                                        name={`status`}
                                                        value={issueDetails.status}
                                                        onChange={handleIssueChange}
                                                        disabled={!(userDetails.result.role === 'manager')}
                                                    >
                                                        <MenuItem value={'none'}>Select</MenuItem>
                                                        <MenuItem value={`open`}>Open</MenuItem>
                                                        <MenuItem value={`progress`}>In Progress</MenuItem>
                                                        <MenuItem value={`closed`}>Closed</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>}
                                        {userDetails.role !== 'client' &&
                                            <Grid item xs={12} sm={12} md={3} xl={3} lg={3}>
                                                <FormControl style={{ minWidth: '150px' }}>
                                                    <InputLabel>Priority</InputLabel>
                                                    <Select
                                                        name={`priority`}
                                                        value={issueDetails.priority}
                                                        onChange={handleIssueChange}
                                                        disabled={!(userDetails.result.role === 'manager')}
                                                    >
                                                        <MenuItem value={'none'}>Select</MenuItem>
                                                        <MenuItem value={`low`}>low</MenuItem>
                                                        <MenuItem value={`medium`}>Medium</MenuItem>
                                                        <MenuItem value={`high`}>High</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>}

                                        <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>

                                            <FileBase
                                                type="file"
                                                multiple={true}
                                                onDone={(result) => {
                                                    result.map((prop) => {
                                                        const img = prop.base64;
                                                        const imgList = issueDetails.attachments;
                                                        imgList.push(img)
                                                        return (setIssueDetails({ ...issueDetails, attachments: imgList }))
                                                    })
                                                }} />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                                            <TextField
                                                required
                                                label="Summary"
                                                fullWidth name={`summary`}
                                                value={issueDetails.summary}
                                                onChange={handleIssueChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                                            <TextField
                                                required
                                                label="Detailed Description"
                                                fullWidth multiline rows={5}
                                                name={`details`}
                                                value={issueDetails.details}
                                                onChange={handleIssueChange}
                                            />
                                        </Grid>


                                    </Grid>
                                </div>
                                <Grid container justify='flex-end'>

                                    <Grid item>
                                        <div className={classes.cardFooter}>
                                            <Button
                                                className={classes.button}
                                                size="large" style={{ backgroundColor: `#9c27b0`, }}
                                                onClick={clearIssuedata}
                                            >
                                                Remove &nbsp;
                                                    <DeleteIcon />
                                            </Button>
                                        </div>
                                    </Grid>

                                    <Grid item>
                                        <div className={classes.cardFooter}>
                                            <Button
                                                type='submit'
                                                className={classes.button}
                                                size="large" style={{ backgroundColor: `#f44336`, }}
                                            >
                                                {'Get started'}
                                            </Button>
                                        </div>
                                    </Grid>

                                </Grid>
                            </form>
                        </div>
                        <Divider />
                        <Toolbar />
                    </div>}

                    
                <div className={classes.card} style={{ marginTop: '20px' }}>
                    <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`} style={{ background: `linear-gradient(60deg, #ff9800, #ff9000)` }} >
                        <Typography className={classes.heading}> Search Issues</Typography>
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
                            <Grid item xs={12} sm={12} md={2} xl={2} lg={2}>
                                <FormControl fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        name={`category`}
                                        value={searchQuery.category}
                                        onChange={handleSearchChange}
                                    >
                                        <MenuItem value={'none'}>Select</MenuItem>
                                        <MenuItem value={`bug`}>Bug</MenuItem>
                                        <MenuItem value={`feature`}>Feature</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={2} xl={2} lg={2}>
                                <FormControl style={{ minWidth: '150px' }}>
                                    <InputLabel>Priority</InputLabel>
                                    <Select
                                        name={`priority`}
                                        value={searchQuery.priority}
                                        onChange={handleSearchChange}
                                    >
                                        <MenuItem value={'none'}>Select</MenuItem>
                                        <MenuItem value={`low`}>low</MenuItem>
                                        <MenuItem value={`medium`}>Medium</MenuItem>
                                        <MenuItem value={`high`}>High</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={2} xl={2} lg={2}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        name={`status`}
                                        value={searchQuery.status}
                                        onChange={handleSearchChange}
                                    >
                                        <MenuItem value='none'>Select</MenuItem>
                                        <MenuItem value={`open`}>Open</MenuItem>
                                        <MenuItem value={`progress`}>In Progress</MenuItem>
                                        <MenuItem value={`closed`}>Closed</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={2} xl={2} lg={2}>
                                <Grid container justify='flex-end'>
                                    <Grid item>
                                        <div className={classes.cardFooter}>
                                            <Button className={classes.button} size="large" style={{ backgroundColor: `#ff9800`, }}
                                                onClick={handleSearchQuery}
                                            >
                                                Clear
                                    </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>

                {issueLoading ? <CircularProgress /> :
                    <Paper className={classes.root1}>
                        <div className={classes.card1}>

                            <TableContainer className={classes.container1}>
                                <Table stickyHeader aria-label="sticky table">


                                    <TableHead >
                                        <TableRow>

                                            {columns.map((column, idx) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth, backgroundColor: `#9c27b0` }}
                                                >
                                                    <div className={`${classes.primaryCardHeader1}`}>
                                                        {column.label}
                                                    </div>
                                                </TableCell>
                                            ))}

                                        </TableRow>
                                    </TableHead>

                                    <TableBody >

                                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {

                                            if (searchQuery.category !== 'none' || searchQuery.status !== 'none' || searchQuery.priority !== 'none') {
                                                if (row['category'] === searchQuery.category || row['status'] === searchQuery.status || row['priority'] === searchQuery.priority) {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                                                            {columns.map((column) => {
                                                                const value = row[column.id];
                                                                if (column.id === 'category') {

                                                                }
                                                                return (
                                                                    <TableCell key={column.id} align={column.align} >
                                                                        <div className={classes.cardBody1}>
                                                                            <ButtonBase style={colorCode(value)} onClick={() => { history.push(`/home/issue/${row.id}`) }}>
                                                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                                                            </ButtonBase>
                                                                        </div>
                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    )
                                                } else {
                                                    return null
                                                }
                                            } else {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align} >
                                                                    <div className={classes.cardBody1}>
                                                                        <ButtonBase style={colorCode(value)} onClick={() => { history.push(`/home/issue/${row.id}`) }}>
                                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                                        </ButtonBase>
                                                                    </div>
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            }
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </div>
                    </Paper>
                }

            </div>
        </div>
    )
}

export default ProjectDetails
