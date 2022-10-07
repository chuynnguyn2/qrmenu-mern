import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { listOrders } from '../../actions/orderActions'
import { Col } from 'react-bootstrap'

import { io } from 'socket.io-client'

const Order = ({restaurantId}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderList = useSelector((state) => state.orderList)
  const { orders } = orderList

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io('http://localhost:8000'))
  }, [])

  useEffect(() => {
    socket?.emit('newRestaurant', restaurantId)
  }, [socket, restaurantId])

  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    socket?.on('getOrder', (order) => {
      setNotifications((prev) => [...prev, order])
    })
  }, [socket])

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    dispatch(listOrders(restaurantId))
  }, [navigate, userInfo, restaurantId])

  const [isFullScreen, setFullScreen] = useState(false)

  return (
    <>
      {notifications.map((n) => (
        <>
          <Col>{n.order.table}</Col>
          {n.order.orderItems.map((i) => (
            <>
              <Col>{i.product}</Col>
              <Col>{i.qty}</Col>
              <Col>{i.price}</Col>
            </>
          ))}
        </>
      ))}

      <button onClick={(e) => setFullScreen(true)}>Go Fullscreen</button>

      {/* <FullScreen
        isFullScreen={isFullScreen}
        onChange={() => {
          setFullScreen(!isFullScreen)
        }}
      >
        {orders.map((item) => (
          <>
            <Col>{item.table}</Col>
            {item.orderItems.map((i) => (
              <>
                <Col>{i.product}</Col>
                <Col>{i.qty}</Col>
                <Col>{i.price}</Col>
              </>
            ))}
          </>
        ))}
      </FullScreen> */}
    </>
  )
}

export default Order
