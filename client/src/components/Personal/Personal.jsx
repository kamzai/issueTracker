import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { CircularProgress, InputLabel, MenuItem, FormControl, Select, Toolbar, Grid, TextField, Button, Typography } from "@material-ui/core";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ButtonBase } from '@material-ui/core'

import { fetchIssueList } from '../../action/issue'
import useStyles from './Styles'

const Report = () => {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const userDetails = JSON.parse(localStorage.getItem('profile'))
    useEffect(() => {
        dispatch(fetchIssueList())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState({
        name: '',
        category: 'none',
        status: 'none',
        priority: 'none',
    })
    const { issueList, issueLoading } = useSelector((store) => store?.issue)

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

    const rows = issueList?.filter((issue) => { return (userDetails.result.userName === issue.assignTo ? createData(issue.projectName, issue.category, issue.priority, issue.status, issue._id, issue.summary) : null) });

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
        <main className={classes.container}>
            <div className={classes.content}>

                    <Toolbar/>
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
                                                                            <ButtonBase style={colorCode(value)} onClick={() => { history.push(`/home/issue/${row._id}`) }}>
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
                                                                        <ButtonBase style={colorCode(value)} onClick={() => { history.push(`/home/issue/${row._id}`) }}>
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
        </main>
    )
}

export default Report
