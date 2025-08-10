import express from 'express'
import { createUser, isloggedIn, loginUser } from '../controller/user.controller.js'
import { logOut } from '../controller/user.controller.js';
const router = express.Router();
router.post('/signin',createUser)
router.post('/login',loginUser)
router.get('/me',isloggedIn)
router.post('/logout', logOut)
export default router;