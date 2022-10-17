import React, { useContext, useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { listProducts } from '../../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../actions/cartActions'
import Product from './Product'
import { totalPriceContext } from '../../screens/MenuToCus'

const ProductToCus = ({ categoryId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList  
  const {totalPrice, setTotalPrice} = useContext(totalPriceContext)
  

  useEffect(() => {
    dispatch(listProducts(categoryId))
  }, [categoryId, dispatch, navigate])  

  return (
    <div className='p-4' >      
        <Row>        
          {products.map((product) => (            
            <Row key={product._id} className='mb-3 product-row' style={{margin:'0', backgroundColor:'white', borderRadius:'10px'}}>
              <Product product={product}/>
              <Button
                onClick={() => {
                  dispatch(addToCart(product._id, 1))
                  setTotalPrice(totalPrice+product.price)
                }}    
                className='product-row-btn '      
                style={{backgroundColor: '#FF6D28'}}      
              >
                Chọn
              </Button>
            </Row>
          )
          )}          
        </Row>
    </div>
  )
}

export default ProductToCus
