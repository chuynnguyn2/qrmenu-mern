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

productRouter.route('/').get(getProducts).post(createProduct)
productRouter
  .route('/:productId')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct)

export default productRouter
