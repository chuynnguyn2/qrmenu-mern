import express from 'express'
const categoryRouter = express.Router()
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js'

categoryRouter
  .route('/')
  .get(getCategories)
  .post(createCategory)
  .put(updateCategory)
  .delete(deleteCategory)

export default categoryRouter
