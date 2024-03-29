import { Server } from 'socket.io'
import colors from 'colors'
import dotenv from 'dotenv'

dotenv.config()

const io = new Server({
  cors: {
    origin: 'http://localhost:3000',
  },
})

let onlineRestaurants = []

const addNewRestaurant = (restaurantId, socketId) => {
  !onlineRestaurants.some(
    (restaurant) => restaurant.restaurantId === restaurantId
  ) && onlineRestaurants.push({ restaurantId:restaurantId, socketId:socketId })
}

const removeRestaurant = (socketId) => {
  onlineRestaurants = onlineRestaurants.filter(
    (restaurant) => restaurant.socketId !== socketId
  )
}

const getRestaurant = (resId) => {  
  return onlineRestaurants.find(
    (restaurant) => restaurant.restaurantId === resId
  )
}

io.on('connection', (socket) => {
  socket.on('newRestaurant', (restaurantId) => {
    addNewRestaurant(restaurantId, socket.id)
  })

socket.on('sendOrder', ({ receiverName, order }) => {  
    const receiver = getRestaurant(receiverName)   
    if (onlineRestaurants.includes(receiver)){        
    io.to(receiver.socketId).emit('getOrder', {
      order: order
    })
  }
})

socket.on('disconnect', () => {
    removeRestaurant(socket.id)
  })
})

io.listen(
  8000, 
  console.log(
    `Socket IO running in ${process.env.NODE_ENV} on port 8000`.magenta.bold
  )) 
