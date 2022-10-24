import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { listOrders, updateOrder } from '../../actions/orderActions'
import { Card, Col, ListGroup, Row, Table } from 'react-bootstrap'

import { io } from 'socket.io-client'

const Order = ({restaurantId}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderList = useSelector((state) => state.orderList)
  const { orders } = orderList

  const ordUpdate = useSelector((state)=>state.orderUpdate)
  const {loading:updateLoading, success: updateSuccess, error: updateError, orderUpdate} = ordUpdate

  const [socket, setSocket] = useState(null)
 
  useEffect(() => {
    setSocket(io('http://localhost:8000'))
  }, [])
 
  useEffect(() => {
    socket?.emit('newRestaurant', restaurantId)
  }, [socket, restaurantId])

  const [notifications, setNotifications] = useState([])
  console.log(notifications)

  useEffect(() => {
    socket?.on('getOrder', (order) => {
      setNotifications((prev) => [...prev, order])
      dispatch(listOrders(restaurantId))
    })
  }, [dispatch, restaurantId, socket])

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    dispatch(listOrders(restaurantId))
    if (updateSuccess){
      dispatch(listOrders(restaurantId))
    }
  }, [navigate, userInfo, restaurantId, dispatch, updateSuccess])

  
  return (
    <div>      
      <Row>      
        {orders.map((item) => (
          <Card style={{width: "18rem", backgroundColor:item.confirm? "white" :"#ffcccc"}} className='m-3 p-2'>
            <Card.Header style={{color:'black', fontWeight:'bold', fontSize:'large', textAlign:'center'}}>Bàn số {item.table}</Card.Header>
            <Table responsive>
              <thead style={{fontSize:'x-small'}}>
                <tr>
                  <th>Tên Món Ăn</th>
                  <th>SL</th>
                  <th>Đơn Giá</th>
                </tr>
              </thead>
              <tbody >
                {item.orderItems.map((i)=>(
                  <tr>
                    <th style={{fontWeight:'normal', fontSize:'small'}}>{i.name}</th>
                    <th style={{fontWeight:'normal', fontSize:'small'}}>{i.qty}</th>
                    <th style={{fontWeight:'normal', fontSize:'small'}}>{i.price}</th>
                  </tr>
                ))}
                <tr>
                  <th>Tổng tiền: {item.totalPrice}</th>
                </tr>
              </tbody>
            </Table>
            {!item.confirm && (<Card.Footer>
              <button onClick={()=>{dispatch(updateOrder ({_id:item._id, confirm:true}))}}>Xac Nhan</button>
            </Card.Footer>)}
            
            
          </Card>
        ))}
        </Row>
      
    </div>
  )
}

export default Order
