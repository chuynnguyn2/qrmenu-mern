import React, { useState, useEffect, useContext } from 'react'
import { Button, Col, Container, Navbar, Offcanvas, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { addToCart } from '../../actions/cartActions'
import { createOrder } from '../../actions/orderActions'
import { io } from 'socket.io-client'
import { totalPriceContext } from '../../screens/MenuToCus'

const Cart = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const orderTable = useSelector((state) => state.order)
  const { loading, success, order } = orderTable

  const [show, setShow] = useState(false)

  const [socket, setSocket] = useState(null)

  const {totalPrice, setTotalPrice} = useContext(totalPriceContext) 
  
  
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
    <div className='d-flex justify-content-center items-align-center'>
    <button className='to-cus-btn' style={{fontSize:'x-small'}} onClick={()=>{setShow(true)}}>
    Xem đơn hàng của bạn
      <i className='fa-solid fa-shopping-cart cart' ></i>    
      </button>
      </div> 
    <Offcanvas show={show} onHide={()=>setShow(false)} placement='end' scroll='true' backdropClassName='true' style={{maxWidth:'75%'}}>
      
              <Offcanvas.Header closeButton>
                <Offcanvas.Title style={{fontSize:'small', fontWeight:'bold'}}>
                  Danh sách các món đã chọn
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                {cartItems.length === 0 ? (
                  <p>Giỏ hàng của bạn trống</p>
                ) : (
                  <div>
                  <Row style={{fontWeight:'bold'}} className='pb-2'>
                    <Col className='col-7'>Tên Món Ăn</Col>
                    <Col>Giá Tiền</Col>
                  </Row>
                    {cartItems.map((item) => (                      
                      <Row>
                        <Col key={item.product} className="col-7" style={{fontSize:'small'}}>{item.name}</Col>                        
                        
                        <Col><strong>{item.qty * item.price} đ</strong></Col>
                        
                        <div className='py-1'>
                        <span className='pe-3' style={{fontSize:'small', fontStyle:'italic'}}>Số Lượng:</span>
                          <i className='fa-solid fa-minus' style={{color:'white', backgroundColor:'#FF6D28', padding:'.3rem', borderRadius:'50%'}}
                          onClick={()=>{if(item.qty>1){dispatch(addToCart(item.product, item.qty-1))
                          setTotalPrice(totalPrice-item.price)
                          }}}                            
                          ></i>
                          <input type='name' className='mx-2'style={{maxWidth:'15%', textAlign:'center'}}
                          value={item.qty}
                          // onChange={(e) => {
                          //   dispatch(addToCart(item.product, e.target.value.replace(/\D/,'')))
                          //   setTotalPrice(totalPrice+(item.price*e.target.value.replace(/\D/,'')))
                          // }}
                          disabled></input>
                          <i className='fa-solid fa-plus' style={{color:'white', backgroundColor:'#FF6D28', padding:'.3rem', borderRadius:'50%'}}
                          onClick={()=>{dispatch(addToCart(item.product, item.qty+1))
                            setTotalPrice(totalPrice+item.price)
                          }}></i>
                        </div>
                        <hr></hr>
                      </Row>
                    ))}
                    <span className='u-margin-bottom-medium'>
                      Tổng Tiền: <strong>{totalPrice} đ</strong>
                    </span>
                    <Row>
                    <button className='to-cus-btn' onClick={placeOrderHandler}>Đặt hàng</button>
                    </Row>
                  </div>
                )}
              </Offcanvas.Body>
              </Offcanvas>
            
    </div>
  )
}

export default Cart
