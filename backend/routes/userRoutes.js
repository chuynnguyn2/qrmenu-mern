import express from 'express'
const userRouter = express.Router()
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js'

userRouter.route('/register').post(registerUser)
userRouter.post('/login', authUser)
userRouter.route('/user/profile').get(getUserProfile).put(updateUserProfile)

export default userRouter
