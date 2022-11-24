import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Category from '../models/categoryModel.js'
import { db } from '../config/db.js'
import { doc, setDoc, getDocs, getDoc, collection } from 'firebase/firestore'
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
  const catId = req.body
  const product = await Product.findById(req.params.productId)

  if (product) {
    await product.remove()
    res.json({ catId: catId })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Update a product
// @route   PUT /api/product/:productId
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, description, price, isFeatured } = req.body

  const product = await Product.findById(req.params.productId)

  if (product) {
    product.name = name || product.name
    product.image = image || product.image
    product.description = description || product.description
    product.price = price || product.price
    product.isFeatured = isFeatured || product.isFeatured

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
