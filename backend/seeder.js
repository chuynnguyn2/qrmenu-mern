import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/user.js'
import products from './data/products.js'
import restaurants from './data/restaurant.js'
import categories from './data/categories.js'
import User from './models/userModel.js'
import Category from './models/categoryModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import Restaurant from './models/restaurantModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await Category.deleteMany()
    await Restaurant.deleteMany()
    await User.deleteMany()

    const createdUser = await User.insertMany(users)
    const createdUserId = createdUser[0]._id

    
    const restaurantList = restaurants.map((restaurant) => {
      return { ...restaurant, user: createdUserId }
    })
    const createdRestaurants = await Restaurant.insertMany(restaurantList)
    const createdRestaurant = createdRestaurants[0]._id


    const categoriesList = categories.map((category) => {
      return { ...category, user: createdUserId, restaurant: createdRestaurant }
    })
    const createdCategories = await Category.insertMany(categoriesList)
    const createdCategory = createdCategories[0]._id


    const productList = products.map((product) => {
      return { ...product, user: createdUserId , category: createdCategory, restaurant: createdRestaurant }
    })
    await Product.insertMany(productList)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await Category.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
