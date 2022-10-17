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
 
  // useEffect(() => {
  //   setSocket(io('http://localhost:8000'))
  // }, [])

  // useEffect(() => {
  //   socket?.emit('newRestaurant', restaurantId)
  // }, [socket, restaurantId])

  // const [notifications, setNotifications] = useState([])
  // console.log(notifications)

  // useEffect(() => {
  //   socket?.on('getOrder', (order) => {
  //     setNotifications((prev) => [...prev, order])
  //   })
  // }, [socket])

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    dispatch(listOrders(restaurantId))
  }, [navigate, userInfo, restaurantId, dispatch])

  
  return (
    <>
      {/* {notifications.map((n1) => (n1.map((n)=>(
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
        ))))}      */}
      <hr></hr>
      
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
      
    </>
  )
}

export default Order
