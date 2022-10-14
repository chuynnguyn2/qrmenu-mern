import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Row } from 'react-bootstrap'

const Product = ({ product }) => {
  console.log(product.image)
  return (
    <Row className='product-row-product'>
      {product.image!=='/upload/jgk.jpg' &&(<Col className='col-4 me-3 d-flex justify-content-center items-align-center'>
          <img className='img-fluid m-2' src={product.image} alt = {product.name} style={{borderRadius:'10px'}}></img>
      </Col>)}
      <Col className='col'>
      
        <Row>{product.name}</Row>  
        <Row><strong style={{padding: "0", fontSize:'small'}}>{product.price} VND</strong></Row>
        <Row>{product.isFeatured ? <span style={{color:'red',padding: "0", fontSize:'small'}}>Món nhiều người chọn</span> : null}</Row>      
        <Button variant='link' style={{padding: "0", fontSize:'x-small'}}>Xem Chi Tiết &rarr;</Button>
             
      
      </Col>

    </Row>
  )
}

export default Product
