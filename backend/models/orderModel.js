import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Restaurant',
    },   
    orderItems: [
      {
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        name: {type: String, required: true},
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],    
    table: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    // shippingAdress: {
    //   address: { type: String, required: true },
    //   city: { type: String, required: true },
    //   district: { type: String, required: true },
    //   commune: { type: String, required: true },
    // },
    // paymentMethod: {
    //   type: String,
    //   required: true,
    // },
    // paymentResult: {
    //   id: { type: String },
    //   status: { type: String },
    //   update_time: { type: String },
    //   email_address: { type: String },
    // },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    confirm:{
      type: Boolean,
      require:true,
      default:false,
    }, 
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
