import express from 'express'

import {
  addOrderItems,  
  updateOrder,
  getMyOrders,
  //   getOrders,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const orderRouter = express.Router()

orderRouter.route('/').post(addOrderItems).get(protect, getMyOrders)
//orderRouter.route('/byId').get(getOrderById)
orderRouter.route('/:id').put(protect, updateOrder)


export default orderRouter
