import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'
import Restaurant from '../models/restaurantModel.js'
import User from '../models/userModel.js'

// @desc    Fetch all categories
// @route   GET /api/category?restaurant
//@access   Private
const getCategories = asyncHandler(async (req, res) => {
  let filter = { restaurant: req.query.restaurant }
  const categories = await Category.find(filter).sort({ index: 1 })
  res.json(categories)
})

// @desc    Create category
// @route   POST /api/category?restaurant
//@access   Private
const createCategory = asyncHandler(async (req, res) => {
  const userExist = User.findById(req.body.user)

  if (!userExist) {
    res.status(400)
    throw new Error('Invalid User')
  }

  const { restaurant, name, user, index } = req.body

  const categoryExists = await Category.findOne({ name })

  if (categoryExists) {
    res.status(400)
    throw new Error('Category already exists')
  }
  const category = await Category.create({
    user,
    name,
    index,
    restaurant,
  })

  if (category) {
    res.status(201).json({
      _id: category._id,
      user: category.user,
      name: category.name,
      index: category.index,
    })
  } else {
    res.status(400)
    throw new Error('Invalid category data')
  }
})
// const createCategory = asyncHandler(async (req, res) => {
//   const restaurantExist = Restaurant.findById(req.body.restaurant)

//   if (!restaurantExist) {
//     res.status(400)
//     throw new Error('Invalid Restaurant')
//   }

//   const { restaurant, name } = req.body

//   const categoryExists = await Category.findOne({ name })

//   if (categoryExists) {
//     res.status(400)
//     throw new Error('Category already exists')
//   }
//   const category = await Category.create({
//     restaurant,
//     name,
//   })

//   if (category) {
//     res.status(201).json({
//       _id: category._id,
//       restaurant: category.restaurant,
//       name: category.name,
//     })
//   } else {
//     res.status(400)
//     throw new Error('Invalid category data')
//   }
// })

// @desc    Delete a category
// @route   DELETE /api/category/:categoryId
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.categoryId)

  if (category) {
    await category.remove()
    res.json({ message: 'Category removed' })
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

// @desc    Update a category
// @route   PUT /api/category/:categoryId
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body
  const { index } = req.body

  const category = await Category.findById(req.params.categoryId)

  if (category) {
    category.name = name || category.name
    category.index = index || category.index

    const updatedCategory = await category.save()
    res.json(updatedCategory)
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

export { getCategories, createCategory, updateCategory, deleteCategory }
