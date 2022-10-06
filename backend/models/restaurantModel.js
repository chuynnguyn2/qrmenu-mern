import mongoose from 'mongoose'

const restaurantSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    wifi: {
      type: String,
    },
    password: {
      type: String,
    },
    tableNo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)
const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant
