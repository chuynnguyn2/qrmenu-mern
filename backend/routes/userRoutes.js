import express from 'express'
const userRouter = express.Router()
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

userRouter.route('/register').post(registerUser)
userRouter.post('/login', authUser)
userRouter
  .route('/user/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default userRouter
