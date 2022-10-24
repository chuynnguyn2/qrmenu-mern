import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/order
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    totalPrice,
    table,
    shippingAddress,
    paymentMethod,
    paymentResult,
    taxPrice,
    isDelivered,
    restaurant,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      restaurant,
      totalPrice,
    table,
    shippingAddress,
    paymentMethod,
    paymentResult,
    taxPrice,
    isDelivered,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by res and table
// @route   GET /api/order
// @access  Public
// const getOrderById = asyncHandler(async (req, res) => {
//   const rest = req.restaurant
//   const tabl = req.table
//   const order = await Order.find({restaurant:rest, table:tabl})

//   if (order) {
//     res.json(order)
//   } else {
//     res.status(404)
//     throw new Error('Order not found')
//   }
// })

// @desc    Update order to paid
// @route   GET /api/orders/:id/confirm
// @access  Private
const updateOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    totalPrice,
    table,
    confirm,
    shippingAddress,
    paymentMethod,
    paymentResult,
    taxPrice,
    isDelivered,
    restaurant,
  } = req.body
  const order = await Order.findById(req.params.id)

  if (order) {
    
    order.orderItems = orderItems || order.orderItems
    order.totalPrice = totalPrice || order.totalPrice
    order.table = table || order.table
    order.confirm = confirm || order.confirm
    order.shippingAddress = shippingAddress || order.shippingAddress
    order.paymentMethod = paymentMethod || order.paymentMethod
    order.paymentResult = paymentResult || order.paymentResult
    order.taxPrice = taxPrice || order.taxPrice
    order.isDelivered = isDelivered || order.isDelivered
    order.restaurant = restaurant || order.restaurant
    
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
// const updateOrderToPaid = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id)

//   if (order) {
//     order.isPaid = true
//     order.paidAt = Date.now()
//     order.paymentResult = {
//       id: req.body.id,
//       status: req.body.status,
//       update_time: req.body.update_time,
//       email_address: req.body.payer.email_address,
//     }

//     const updatedOrder = await order.save()

//     res.json(updatedOrder)
//   } else {
//     res.status(404)
//     throw new Error('Order not found')
//   }
// })

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
// const updateOrderToDelivered = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id)

//   if (order) {
//     order.isDelivered = true
//     order.deliveredAt = Date.now()

//     const updatedOrder = await order.save()

//     res.json(updatedOrder)
//   } else {
//     res.status(404)
//     throw new Error('Order not found')
//   }
// })

// @desc    Get all orders of one restaurant 
// @route   GET /api/order?restaurant
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {  
  let filter = { restaurant: req.query.restaurant }
  
  const orders = await Order.find(filter).populate('restaurant')
  res.json(orders)
})

// // @desc    Get all orders
// // @route   GET /api/orders
// // @access  Private/Admin
// const getOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({}).populate('user', 'id name')
//   res.json(orders)
// })

export {
  addOrderItems,
  //getOrderById,
  updateOrder,
  getMyOrders,
//   getOrders,
}
