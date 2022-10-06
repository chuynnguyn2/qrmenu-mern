import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import connectDB from './config/db.js'
import categoryRouter from './routes/categoryRoutes.js'
import restaurantRouter from './routes/restaurantRoutes.js'
import userRouter from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRouter from './routes/productRoutes.js'
import uploadRouter from './routes/uploadRoutes.js'
import orderRouter from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/product', productRouter)
app.use('/api/category', categoryRouter)
app.use('/api/restaurant', restaurantRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/order', orderRouter)
app.use('/api', userRouter)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV}on port ${PORT}`.yellow.bold
  )
)
