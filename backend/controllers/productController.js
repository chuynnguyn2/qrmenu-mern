import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Category from '../models/categoryModel.js'
import { db } from '../config/db.js'
import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  collection,
  deleteDoc,
} from 'firebase/firestore'
import { runTransaction } from 'firebase/firestore'

// @desc    Fetch all products
// @route   GET /api/product?user
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
  const user = req.query.user
  const productsRef = collection(db, 'users', user, 'food')
  const querySnapshot = await getDocs(productsRef)
  let products = []
  querySnapshot.forEach((doc) => {
    products.push(doc.data())
  })
  res.json(products)
})

// @desc    Fetch all products
// @route   GET /api/product?user
//@access   Public
const getProductById = asyncHandler(async (req, res) => {
  const user = req.query.user
  const productsRef = collection(db, 'users', user, 'food')
  const querySnapshot = await getDocs(productsRef)
  let products = []
  querySnapshot.forEach((doc) => {
    products.push(doc.data())
  })
  res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/product/productId
//@access   Public
const createProduct = asyncHandler(async (req, res) => {
  const { name, user, id, cat, imgUrl, description, price, isHot, material } =
    req.body
  const docRef = doc(db, 'users', user, 'food', id)

  await setDoc(docRef, {
    cat: cat,
    id: id,
    name: name,
    description: description,
    imgUrl: imgUrl,
    isHot: isHot,
    material: material,
    price: price,
  })
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      console.log(error.message)
    })
})

// @desc    Delete a product
// @route   DELETE /api/product/:productId
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const { id, user } = req.body

  const docRef = doc(db, 'users', user, 'food', id)

  await deleteDoc(docRef)
    .then((data) => {
      console.log('sucess delete category')
      res.json(data)
    })
    .catch((e) => {
      console.log(e)
    })
})

// @desc    Update a product
// @route   PUT /api/product/:productId
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, user, id, imgUrl, description, price, isHot, material } =
    req.body
  const docRef = doc(db, 'users', user, 'food', id)

  await runTransaction(db, async (transaction) => {
    const sfDoc = await transaction.get(docRef)
    if (!sfDoc.exists()) {
      throw 'Document does not exist!'
    }
    transaction.update(docRef, {
      name: name || sfDoc.data().name,
      imgUrl: imgUrl || sfDoc.data().imgUrl,
      description: description || sfDoc.data().description,
      price: price || sfDoc.data().price,
      isHot: isHot || sfDoc.data().isHot,
      material: material || sfDoc.data().material,
    })
  })
    .then((data) => {
      console.log('Product update successfully committed!')
      res.json(data)
    })
    .catch((e) => {
      console.log('Transaction failed: ', e)
    })
})

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
