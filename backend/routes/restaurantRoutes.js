import express from 'express'
import asyncHandler from 'express-async-handler'
const restaurantRouter = express.Router()
import Restaurant from '../models/restaurantModel.js'
import {
  getRestaurants,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
} from '../controllers/restaurantControllers.js'

restaurantRouter.route('/').get(getRestaurants).post(createRestaurant)
restaurantRouter
  .route('/:restaurantId')
  .delete(deleteRestaurant)
  .put(updateRestaurant)

export default restaurantRouter
