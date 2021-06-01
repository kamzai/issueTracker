import express from 'express'
import auth from "../middleware/auth.js"
import {getProjectList, createProject, updateProjectDetails, deleteProject} from "../controller/project.js";

const router = express.Router()


router.get('/', getProjectList);
router.post('/', createProject);

router.patch('/:id', auth, updateProjectDetails)
router.delete('/:id', auth, deleteProject )
export default router