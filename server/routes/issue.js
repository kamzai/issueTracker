import express from 'express'
import {createIssue, getIssueList, updateIssue} from '../controller/issue.js'
const router = express.Router()

router.get('/', getIssueList)
router.post('/', createIssue)

router.patch(`/:id`, updateIssue)


export default router