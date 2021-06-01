import React from 'react'
import { Card, Typography, CardMedia, ButtonBase, Button, CardActions, CardContent } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import DeleteIcon from "@material-ui/icons/Delete"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import moment from "moment"
import useStyles from "./Styles"
import {useHistory} from 'react-router-dom';


const ProjectCard = ({ projectDetails, setCurrentId, issue}) => {

    const classes = useStyles()
    const history = useHistory();

    const openProject = () => { 
        if(issue) {
            history.push(`/home/issue/pro/${projectDetails._id}`)
        } else {
            history.push(`/home/project/${projectDetails._id}`) 
        }
    }

    const reduceLength = (message) => {
        const LIMIT = 30
        const words = message.split(' ');
        words.length = LIMIT;
        words.push('. . . .')
        const newMessage = words.join(' ');

        return newMessage;
    }

    function confirmDelete() {
        let result = window.confirm(`Do You Want to DELETE \nProject : ${projectDetails.projectName} \nCreated By : ${projectDetails.creatorName}`);
        if (result) {
            window.alert("DELETED")
        }
    }

    return (
        <Card className={classes.card} elevation={6} raised>

            <ButtonBase className={classes.cardAction} onClick={openProject}>

                <CardMedia image={projectDetails.selectedFile} title={projectDetails.projectName} className={classes.media} />

                <div className={classes.overlay}>
                    <Typography variant="h6">{projectDetails.creatorName}</Typography>
                    <Typography variant="body2">{moment(projectDetails.startDate).fromNow()}</Typography>
                </div>
            </ButtonBase>

            {/* {(user?.result?.googleId === projectDetails?.creator || user?.result?._id === projectDetails?.creator) &&} */}

            {!issue && 
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size="small" onClick={() => { setCurrentId(projectDetails._id) }}> <MoreHorizIcon fontSize="default" /> </Button>
            </div>}

            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{projectDetails.status}</Typography>
            </div>

            <ButtonBase className={classes.cardAction} onClick={openProject}>
                <Typography variant="h5" className={classes.title} gutterBottom component="h2">{projectDetails.projectName}</Typography>

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{reduceLength(projectDetails.description)}</Typography>
                </CardContent>
            </ButtonBase>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => { window.alert('Liked') }}>
                    <ThumbUpAltIcon />
                </Button>
                {/* {(user?.result?.googleId === projectDetails?.creator || user?.result?._id === projectDetails?.creator) && } */}
                <Button size="small" color="primary" onClick={confirmDelete}>
                    <DeleteIcon fontSize='small' />Delete</Button>
            </CardActions>
        </Card>
    )
}

export default ProjectCard
