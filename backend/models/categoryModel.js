import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
    name: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Category = mongoose.model('Category', categorySchema)

export default Category
