import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Category from '../models/categoryModel.js'

// @desc    Fetch all products
// @route   GET /api/product?category
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
  let filter = {}
  if (req.query.category) {
    filter = { category: req.query.category }
  }
  const products = await Product.find(filter).populate('category')
  res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/product/productId
//@access   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('product not Found')
  }
})

const createProduct = asyncHandler(async (req, res) => {
  const categoryExist = Category.findById(req.body.category)

  if (!categoryExist) {
    res.status(400)
    throw new Error('Invalid Category')
  }

  const { category, name, image, description, price, isFeatured } = req.body

  const productExists = await Product.findOne({ name })

  if (productExists) {
    res.status(400)
    throw new Error('Product already exists')
  }
  const product = await Product.create({
    category,
    name,
    image,
    description,
    price,
    isFeatured,
  })

  if (product) {
    res.status(201).json({
      _id: product._id,
      category: product.category,
      name: product.name,
      image: product.image,
      description: product.description,
      price: product.price,
      isFeatured: product.isFeatured,
    })
  } else {
    res.status(400)
    throw new Error('Invalid product data')
  }
})

// @desc    Delete a product
// @route   DELETE /api/product/:productId
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
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
