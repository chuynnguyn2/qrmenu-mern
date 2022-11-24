import express from 'express'
import asyncHandler from 'express-async-handler'
const productRouter = express.Router()
import Product from '../models/productModel.js'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'

productRouter
  .route('/')
  .get(getProducts)
  .post(createProduct)
  .put(updateProduct)
  .delete(deleteProduct)
productRouter.route('/:productId').get(getProductById)

export default productRouter
