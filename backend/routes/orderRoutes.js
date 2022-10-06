import express from 'express'

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  //   getOrders,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const orderRouter = express.Router()

orderRouter.route('/').post(addOrderItems).get(protect, getMyOrders)
// orderRouter.route('/myorders').get(protect, getMyOrders)
orderRouter.route('/:id').get(protect, getOrderById)
orderRouter.route('/:id/pay').put(protect, updateOrderToPaid)
orderRouter.route('/:id/deliver').put(protect, updateOrderToDelivered)

export default orderRouter
