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

restaurantRouter
  .route('/')
  .get(getRestaurants)
  .post(createRestaurant)
  .put(updateRestaurant)
  .delete(deleteRestaurant)

export default restaurantRouter
