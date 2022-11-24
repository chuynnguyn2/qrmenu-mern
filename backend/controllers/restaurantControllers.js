import asyncHandler from 'express-async-handler'
import { db } from '../config/db.js'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore'
import { runTransaction } from 'firebase/firestore'

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

  await setDoc(docRef, {
    id: uniqueId,
    name: name,
    address: address,
    phone: phone,
    wifi: '',
    wifiPassword: '',
    table: 0,
  })
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      console.log(error.message)
    })
})

// @desc    Delete a product
// @route   DELETE /api/restaurant/:restaurantId
// @access  Private/Admin
const deleteRestaurant = asyncHandler(async (req, res) => {
  const { user, id } = req.body

  const docRef = collection(db, 'users', user, 'restaurant', id)

  await deleteDoc(docRef)
    .then((data) => {
      console.log('Successful delete restaurant')
      res.json(data)
    })
    .catch((e) => {
      console.log(e)
    })
})

// @desc    Update a restaurant
// @route   PUT /api/restaurant/
// @access  Private/Admin
const updateRestaurant = asyncHandler(async (req, res) => {
  const { name, address, phone, wifi, wifiPassword, table, id, user } = req.body

  const docRef = doc(db, 'users', user, 'restaurant', id)

  await runTransaction(db, async (transaction) => {
    const sfDoc = await transaction.get(docRef)
    if (!sfDoc.exists()) {
      throw 'Document does not exist!'
    }
    transaction.update(docRef, {
      name: name || sfDoc.data().name,
      address: address || sfDoc.data().address,
      phone: phone || sfDoc.data().phone,
      wifi: wifi || sfDoc.data().wifi,
      wifiPassword: wifiPassword || sfDoc.data().wifiPassword,
      table: table || sfDoc.data().table,
    })
  })
    .then((data) => {
      console.log('Restaurant update successfully committed!')
      res.json(data)
    })
    .catch((e) => {
      console.log('Transaction failed: ', e)
    })
})

export { getRestaurants, createRestaurant, deleteRestaurant, updateRestaurant }
