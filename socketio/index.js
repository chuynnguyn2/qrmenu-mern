import { Server } from 'socket.io'

const io = new Server({
  cors: {
    origin: 'http://localhost:3000',
  },
})

let onlineRestaurants = []

const addNewRestaurant = (restaurantId, socketId) => {
  !onlineRestaurants.some(
    (restaurant) => restaurant.restaurantId === restaurantId
  ) && onlineRestaurants.push({ restaurantId, socketId })
}

const removeRestaurant = (socketId) => {
  onlineRestaurants = onlineRestaurants.filter(
    (restaurant) => restaurant.socketId !== socketId
  )
}

const getRestaurant = (restaurantId) => {
  return onlineRestaurants.find(
    (restaurant) => restaurant.restaurantId === restaurantId
  )
}

io.on('connection', (socket) => {
  socket.on('newRestaurant', (restaurantId) => {
    addNewRestaurant(restaurantId, socket.id)
  })

  socket.on('sendOrder', ({ receiverName, order }) => {
    const receiver = getRestaurant(receiverName)
    io.to(receiver.socketId).emit('getOrder', {
      order,
      //   table,
    })
  })

  socket.on('disconnect', () => {
    removeRestaurant(socket.id)
  })
})

io.listen(8000)
