import React, { useState, useEffect, useContext } from 'react'
import { Button, Col, Container, Navbar, Offcanvas, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { addToCart, removeFromCart } from '../../actions/cartActions'
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
  const { loading, success, orderOrdered } = orderTable
  const [orderItems, setOrderItems] = useState(JSON.parse(localStorage.getItem('orderItems')))
  let totalP = 0
  if (orderItems){    
    orderItems.orderItems.map((i)=>totalP+=(i.price*i.qty))
  let t = Date.parse(orderItems.updatedAt)
  let now = Date.now()
  let gap = now-t
  if (gap>10800000){
    localStorage.removeItem('orderItems')
  }  
}

  const [show, setShow] = useState(false)  

  const [socket, setSocket] = useState(null)

  const {totalPrice, setTotalPrice} = useContext(totalPriceContext) 
   
  
  useEffect(() => {
    setSocket(io('http://localhost:8000'))
    if (success){
      setOrderItems(JSON.parse(localStorage.getItem('orderItems')))
      socket.emit('sendOrder', {
        receiverName: params.restaurantId,
        order: orderOrdered      
      })
    }
  }, [dispatch, params.restaurantId, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        restaurant: params.restaurantId,
        table: searchParams.get('table'),
        totalPrice: totalPrice,
      })
    )        
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

              {orderItems ?(
                <div>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Tên Món Ăn</th>
                      <th>Số Lượng</th>
                      <th>Đơn Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.orderItems.map((item)=>(
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                
                <div><span className='u-margin-bottom-medium'>
                      Tổng Tiền: <strong>{totalP} đ</strong>
                    </span>
                    </div>
                <span style={{fontSize:"small"}}><strong>Chú ý: </strong>Nếu muốn thay đổi đơn hàng bên trên, vui lòng liên hệ với phục vụ nhà hàng</span>
              </div>) : (
                <Offcanvas.Body>
                {cartItems.length === 0 ? (
                  <p>Giỏ hàng của bạn trống</p>
                ) : (
                  <div>
                  <Row style={{fontWeight:'bold'}} className='pb-2'>
                    <Col className='col-7'>Tên Món Ăn</Col>
                    <Col>Đơn Giá</Col>
                  </Row>
                    {cartItems.map((item) => (                      
                      <Row>
                        <Col key={item.product} className="col-7" style={{fontSize:'small'}}>{item.name}</Col>                        
                        
                        <Col><strong>{item.price} đ</strong></Col>
                        
                        <div className='py-1'>
                        <span className='pe-3' style={{fontSize:'small', fontStyle:'italic'}}>Số Lượng:</span>
                          <i className='fa-solid fa-minus' style={{color:'white', backgroundColor:'#FF6D28', padding:'.3rem', borderRadius:'50%'}}
                          onClick={()=>{if(item.qty>1){dispatch(addToCart(item.product, item.qty-1))
                          setTotalPrice((totalPrice-item.price))
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
                            setTotalPrice((totalPrice+item.price))
                          }}
                        
                          ></i>
                          <i className='fa-solid fa-trash-can  ms-3' style={{color:'#FF6D28'}} 
                          onClick={()=>{ 
                            setTotalPrice((totalPrice-(item.price*item.qty)))
                            dispatch(removeFromCart(item.product))                        

                          }}></i>
                        </div>

                        <hr></hr>
                      </Row>
                    ))}
                    <div>
                    <span className='u-margin-bottom-medium'>
                      Tổng Tiền: <strong>{totalPrice} đ</strong>
                    </span>
                    </div>
                    <Row>
                    <button className='to-cus-btn u-margin-bottom-small' onClick={placeOrderHandler}>Đặt món</button>
                    </Row>
                    <span style={{fontSize:"small"}}><strong>Chú ý: </strong>Sau khi nhấn chọn <strong>"Đặt món"</strong>, nếu muốn thay đổi đơn hàng, vui lòng liên hệ với phục vụ nhà hàng</span>
                  </div>
                )}
              </Offcanvas.Body>
              )}

              
              </Offcanvas>
            
    </div>
  )
}

export default Cart
