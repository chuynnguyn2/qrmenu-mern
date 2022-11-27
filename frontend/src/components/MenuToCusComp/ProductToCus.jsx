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
  const { totalPrice, setTotalPrice } = useContext(totalPriceContext)

  const carts = useSelector((state) => state.cart)
  const { cartItems } = carts

  let cartProId = []
  if (cartItems) {
    cartItems.map((i) => {
      cartProId.push(i.product)
    })
  }

  return (
    <div className='p-4'>
      <Row>
        {products.map((product) => (
          <>
            {product.cat === categoryId || categoryId === '' ? (
              <Row
                key={product.id}
                className='mb-3 product-row'
                style={{
                  margin: '0',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                }}
              >
                <Product product={product} />
                <Button
                  disabled={cartProId.includes(product.id)}
                  onClick={() => {
                    dispatch(addToCart(product.id, 1))
                    setTotalPrice(totalPrice + product.price)
                  }}
                  className='product-row-btn '
                  style={{ backgroundColor: '#FF6D28' }}
                >
                  {cartProId.includes(product.id) ? 'Đã Chọn' : 'Chọn'}
                </Button>
              </Row>
            ) : (
              <></>
            )}
          </>
        ))}
      </Row>
    </div>
  )
}

export default ProductToCus
