import express from 'express'
import asyncHandler from 'express-async-handler'
const categoryRouter = express.Router()
import Category from '../models/categoryModel.js'
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js'

categoryRouter.route('/').get(getCategories).post(createCategory)
categoryRouter.route('/:categoryId').put(updateCategory).delete(deleteCategory)

export default categoryRouter
