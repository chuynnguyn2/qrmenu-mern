import asyncHandler from 'express-async-handler'
import { db } from '../config/db.js'
import { doc, setDoc, getDocs, getDoc, collection } from 'firebase/firestore'
import { runTransaction } from 'firebase/firestore'
import { query, orderBy, limit } from 'firebase/firestore'

// @desc    Fetch all categories
// @route   GET /api/category
//@access   Private
const getCategories = asyncHandler(async (req, res) => {
  const user = req.query.user
  const categoriesRef = collection(db, 'users', user, 'menu')
  const q = query(categoriesRef, orderBy('count'), limit(50))
  const querySnapshot = await getDocs(q)
  let categories = []
  querySnapshot.forEach((doc) => {
    categories.push(doc.data())
  })
  res.json(categories)
})

// @desc    Create category
// @route   POST /api/category
//@access   Private
const createCategory = asyncHandler(async (req, res) => {
  const uniqueId = Date.now().toString()
  const { name, user } = req.body
  const docRef = doc(db, 'users', user, 'menu', uniqueId)

  await setDoc(docRef, {
    id: uniqueId,
    name: name,
    count: uniqueId,
  })
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      console.log(error.message)
    })
})

// @desc    Delete a category
// @route   DELETE /api/category/:categoryId
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.categoryId)

  if (category) {
    await category.remove()
    res.json({ message: 'Category removed' })
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

// @desc    Update a category
// @route   PUT /api/category/:categoryId
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name, count, id, user } = req.body

  const docRef = doc(db, 'users', user, 'menu', id)

  await runTransaction(db, async (transaction) => {
    const sfDoc = await transaction.get(docRef)
    if (!sfDoc.exists()) {
      throw 'Document does not exist!'
    }
    transaction.update(docRef, {
      name: name || sfDoc.data().name,
      count: count || sfDoc.data().count,
    })
  })
    .then((data) => {
      console.log('Transaction successfully committed!')
      res.json(data)
    })
    .catch((e) => {
      console.log('Transaction failed: ', e)
    })
})

export { getCategories, createCategory, updateCategory, deleteCategory }
