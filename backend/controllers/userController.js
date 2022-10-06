import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Auth user&get token
// @route   POST /api/users/login
//@access   Public
const authUser = asyncHandler(async (req, res) => {
  const { loginId, password } = req.body

  const user = await User.findOne({phone: loginId  
  })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      type: user.type,
      isActive: user.isActive,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid phone number or password')
  }
})

// @desc    Get user profile
// @route   GET /api/user/profile
//@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      type: user.type,
      isActive: user.isActive,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/login
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.type = req.body.type || user.type
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      type: user.type,
      isActive: user.isActive,
      token: generateToken(user._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Auth user&get token
// @route   POST /api/users/login
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, type, isActive } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({
    name,
    email,
    password,
    phone,
    type,
    isActive,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      type: user.type,
      isActive: user.isActive,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

export { authUser, getUserProfile, registerUser, updateUserProfile }
