import express from 'express'
import { createUser, loginUser } from '../controller/user.controller.js'

const router = express.Router();
router.post('/signin',createUser)
router.post('/login',loginUser)
export default router;