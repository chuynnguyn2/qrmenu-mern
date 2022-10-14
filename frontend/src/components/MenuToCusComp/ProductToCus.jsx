import React, { useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { listProducts } from '../../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../actions/cartActions'
import Product from './Product'

const ProductToCus = ({ categoryId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts(categoryId))
  }, [categoryId, dispatch, navigate])

  const productChosenHandler = (productid) => {
    dispatch(addToCart(productid, 1))
  }

  return (
    <>      
        <Row>        
          {products.map((product) => (            
            <Col key={product._id}>
              <Product product={product} />
              <Button
                onClick={() => {
                  productChosenHandler(product._id)
                }}
              >
                Chọn
              </Button>
            </Col>
          )
          )}          
        </Row>
    </>
  )
}

export default ProductToCus
