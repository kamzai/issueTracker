import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { updateIssue } from '../../../action/issue'

import { Typography, Grid, TextField, Toolbar, Divider, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress} from "@material-ui/core"
import useStyles from './Styles'

const IssueDetails = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const history = useHistory();
    
    const userDetails = JSON.parse(localStorage.getItem('profile'))



    const { id } = useParams();
    const { issueList, issueLoading} = useSelector((store) => store?.issue)
    // const [issueLoading, setIssueLoading] = useState(true);
    const [issueDetails, setIssueDetails] = useState(issueList.find((issue) => issue._id === id))

    const project = useSelector((store) => { return (id ? store?.project.projectList.find((p) => { return p._id === issueDetails.projectId }) : null) })

    const handleIssueChange = (e) => {
        const { name, value } = e.target;
        setIssueDetails((prev) => { return ({ ...prev, [name]: value }) })
    }

    return (
        <main className={classes.container}>
            <div className={classes.content}>
                <Toolbar />

                {issueLoading ? <CircularProgress/> : 
                <div>
                <div className={classes.card}>
                    <form autoComplete="off" className={classes.form}>
                        <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`} style={{ background: `linear-gradient(60deg, #f44336, #f44336)` }} >
                            <Typography className={classes.heading}>{'Issue Details'} </Typography>
                        </div>
                        <div className={classes.cardBody}>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
                                    <TextField
                                        required
                                        label="Project Name"
                                        fullWidth
                                        name={'projectName'}
                                        value={issueDetails?.projectName}
                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} xl={3} lg={3}>
                                    <TextField
                                        required
                                        label="Reporter"
                                        fullWidth
                                        defaultValue={issueDetails?.reporterName}
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
                                        value={issueDetails?.submitDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        disabled
                                    />

                                </Grid>

                                {userDetails.result.role !== 'client' &&
                                    <Grid item xs={12} sm={12} md={3} xl={3} lg={3}>
                                        <FormControl style={{ minWidth: '150px' }}>
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                name={`category`}
                                                value={issueDetails.category}
                                                onChange={handleIssueChange}
                                                disabled={userDetails.result.role === 'developer'}
                                            >
                                                <MenuItem value={'none'}>Select</MenuItem>
                                                <MenuItem value={`bug`}>Bug</MenuItem>
                                                <MenuItem value={`feature`}>Feature</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>}

                                {userDetails.result.role !== 'client' &&
                                    <Grid item xs={12} sm={12} md={3} xl={3} lg={3}>

                                        <FormControl style={{ minWidth: '150px' }}>
                                            <InputLabel>Status</InputLabel>
                                            <Select
                                                name={`status`}
                                                value={issueDetails?.status}
                                                onChange={handleIssueChange}
                                            >
                                                <MenuItem value={'none'}>Select</MenuItem>
                                                <MenuItem value={`open`}>Open</MenuItem>
                                                <MenuItem value={`progress`}>In Progress</MenuItem>
                                                <MenuItem value={`closed`}>Closed</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>}

                                {userDetails.result.role !== 'client' &&
                                    <Grid item xs={12} sm={12} md={3} xl={3} lg={3}>
                                        <FormControl style={{ minWidth: '150px' }}>
                                            <InputLabel>Priority</InputLabel>
                                            <Select
                                                name={`priority`}
                                                value={issueDetails?.priority}
                                                onChange={handleIssueChange}
                                                disabled={userDetails.result.role === 'developer'}
                                            >
                                                <MenuItem value={'none'}>Select</MenuItem>
                                                <MenuItem value={`low`}>low</MenuItem>
                                                <MenuItem value={`medium`}>Medium</MenuItem>
                                                <MenuItem value={`high`}>High</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>}
                                {userDetails.result.role !== 'client' &&
                                    <Grid item xs={12} sm={12} md={3} xl={3} lg={3}>

                                        <FormControl style={{ minWidth: '150px' }}>
                                            <InputLabel>Assign To</InputLabel>
                                            <Select
                                                name={`assignTo`}
                                                value={issueDetails?.assignTo}
                                                onChange={handleIssueChange}
                                                disabled={userDetails.result.role === 'developer'}
                                            >
                                                <MenuItem value={'none'}>Select</MenuItem>
                                                {project.teamMembers.map((item, idx) => {
                                                    return (
                                                        <MenuItem value={item.userName} key={idx}>{item.userName}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>}

                                <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                                    <TextField
                                        required
                                        label="Summary"
                                        fullWidth name={`summary`}
                                        value={issueDetails?.summary}

                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                                    <TextField
                                        required
                                        label="Detailed Description"
                                        fullWidth multiline rows={5}
                                        name={`details`}
                                        value={issueDetails?.details}
                                        disabled
                                    />
                                </Grid>
                            </Grid>

                        </div>
                    </form>

                    {userDetails.result.role !== "client" ?
                        <Grid container justify='flex-end'>
                            <Grid item>
                                <div className={classes.cardFooter}>
                                    <Button
                                        className={classes.button}
                                        size="large" style={{ backgroundColor: `#9c27b0`, }}
                                        onClick={()=>{
                                            // console.log(issueDetails)
                                            dispatch(updateIssue(issueDetails.projectId, issueDetails, history))
                                            }
                                        }
                                    >
                                        Update &nbsp;
                                       
                                    </Button>
                                </div>
                            </Grid>
                        </Grid> : null}
                </div>

                <Toolbar />
                <div className={classes.card}>
                    <form autoComplete="off" className={classes.form}>
                        <div className={`${classes.cardHeader} ${classes.primaryCardHeader}`} style={{ background: `linear-gradient(60deg, #ff9800, #ff9000)` }} >
                            <Typography className={classes.heading}>{'Attachments'} </Typography>
                        </div>
                        <Toolbar />
                        <div className={classes.cardBody}>

                            <Grid container spacing={3}>

                                {issueDetails?.attachments.map((img, idx) => {
                                    return (
                                        <Grid item xs={12} sm={12} md={12} xl={12} lg={12} key={idx}>
                                            <Grid container>
                                                <Grid item xs={12} sm={12} md={3} xl={3} lg={3} >
                                                    <Typography>
                                                        IMAGE :
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={9} xl={9} lg={9} >
                                                    <img src={img} alt={`AttachImage`} style={{ width: '600px', height: '400px' }} />
                                                </Grid>
                                            </Grid>
                                            <Divider />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </div>
                    </form>
                </div>
                
                </div>}

            </div>
        </main>
    )
}

export default IssueDetails
