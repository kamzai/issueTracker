import express from 'express'
import {signIn, signUp, fetchUsers, updateProfile} from '../controller/user.js'

const router = express.Router();

router.get('/', fetchUsers)
router.post('/signin', signIn)
router.post('/signup', signUp)

router.patch('/', updateProfile)


export default router