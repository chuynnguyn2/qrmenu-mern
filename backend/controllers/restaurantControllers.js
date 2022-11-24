import asyncHandler from 'express-async-handler'
import { db } from '../config/db.js'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'

// @desc    Fetch all restaurants
// @route   GET /api/restaurant?user
//@access   Public
const getRestaurants = asyncHandler(async (req, res) => {
  const user = req.query.user

  const collectionRef = collection(db, 'users', user, 'restaurant')

  const querySnapshot = await getDocs(collectionRef)
  let restaurants = []
  querySnapshot.forEach((doc) => {
    restaurants.push(doc.data())
  })
  res.json(restaurants)
})

// @desc    Create restaurant
// @route   POST /api/restaurant?user
//@access   Public
const createRestaurant = asyncHandler(async (req, res) => {
  const { user, name, address, phone } = req.body
  const uniqueId = Date.now().toString()
  const docRef = collection(db, 'users', user, 'restaurant', uniqueId)

  const restaurant = await setDoc(docRef, {
    id: uniqueId,
    name: name,
    address: address,
    phone: phone,
  })

  if (restaurant) {
    res.status(201).json({
      _id: restaurant._id,
      user: restaurant.user,
      name: restaurant.name,
      address: restaurant.address,
      phone: restaurant.phone,
    })
  } else {
    res.status(400)
    throw new Error('Invalid restaurant data')
  }
})

// @desc    Delete a product
// @route   DELETE /api/restaurant/:restaurantId
// @access  Private/Admin
const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.restaurantId)

  if (restaurant) {
    await restaurant.remove()
    res.json({ message: 'Restaurant removed' })
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})

// @desc    Update a restaurant
// @route   PUT /api/restaurant/:restaurantId
// @access  Private/Admin
const updateRestaurant = asyncHandler(async (req, res) => {
  const { name } = req.body
  const { address } = req.body
  const { phone } = req.body
  const { wifi } = req.body
  const { password } = req.body
  const { tableNo } = req.body

  const restaurant = await Restaurant.findById(req.params.restaurantId)

  if (restaurant) {
    restaurant.name = name || restaurant.name
    restaurant.address = address || restaurant.address
    restaurant.phone = phone
    restaurant.wifi = wifi || restaurant.wifi
    restaurant.password = password || restaurant.password
    restaurant.tableNo = tableNo || restaurant.tableNo

    const updatedRestaurant = await restaurant.save()
    res.json(updatedRestaurant)
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})

export { getRestaurants, createRestaurant, deleteRestaurant, updateRestaurant }
