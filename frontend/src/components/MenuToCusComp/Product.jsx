import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Row } from 'react-bootstrap'

const Product = ({ product }) => {
  console.log(product.image)
  return (
    <Row className='product-row-product'>
      {product.image!=='/upload/jgk.jpg' &&(<Col className='col-4 me-2 d-flex justify-content-center items-align-center' style={{padding: "0"}}>
          <img className='img-fluid my-4' src={product.image} alt = {product.name} style={{borderRadius:'10px'}}></img>
      </Col>)}
      <Col className='col'>
      
        <Row>{product.name}</Row>  
        <Row><strong style={{padding: "0", fontSize:'small'}}>{product.price} VND</strong></Row>
        <Row>{product.isFeatured ? <span style={{color:'red',padding: "0", fontSize:'x-small'}}>Món nhiều người chọn</span> : null}</Row>      
        <Button variant='link' style={{padding: "0", fontSize:'x-small', color:'#E80F88'}}>Xem Chi Tiết &rarr;</Button>
             
      
      </Col>

    </Row>
  )
}

export default Product
