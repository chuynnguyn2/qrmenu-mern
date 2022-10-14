import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Navbar, Offcanvas, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { addToCart } from '../../actions/cartActions'
import { createOrder } from '../../actions/orderActions'
import { io } from 'socket.io-client'

const Cart = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const [itemQty, setItemQty] = useState(1)

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const orderTable = useSelector((state) => state.order)
  const { loading, success, order } = orderTable

  const [show, setShow] = useState(false)

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io('http://localhost:8000'))
  }, [])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        restaurant: params.restaurantId,
        table: searchParams.get('table'),
      })
    )
    socket.emit('sendOrder', {
      receiverName: params.restaurantId,
      order: order,
      // table: searchParams.get('table'),
    })
  }

  return (
    <div>    
      <i className='fa-solid fa-cart cart' onClick={()=>{setShow(true)}} >abc</i>    
    <Offcanvas show={show} onHide={()=>setShow(false)} placement='end' scroll='true' backdropClassName='true' style={{maxWidth:'70%'}}>
      
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  Danh sách các món đã chọn
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                {cartItems.length === 0 ? (
                  <p>Giỏ hàng của bạn trống</p>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <Row>
                        <Col key={item.product}>{item.name}</Col>
                        <input
                          type='number'
                          placeholder='1'
                          min={1}
                          onChange={(e) => {
                            dispatch(addToCart(item.product, e.target.value))
                          }}
                        ></input>
                        <Col>{itemQty * item.price}</Col>
                      </Row>
                    ))}
                    <button className='light-btn' onClick={placeOrderHandler}>Đặt hàng</button>
                  </>
                )}
              </Offcanvas.Body>
              </Offcanvas>
            
    </div>
  )
}

export default Cart
