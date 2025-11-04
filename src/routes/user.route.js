import express from 'express'
import { getUserByID, getUserByToken, getUsers, loginUser, registerUser } from '../controller/user.controller'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

// TODO: Add webToken
router.get('/', getUsers)
router.get('/profile', getUserByToken)
router.get('/:id', getUserByID)

export default router