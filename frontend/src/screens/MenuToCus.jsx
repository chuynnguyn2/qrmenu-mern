import React, { createContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { listCategories } from '../actions/categoryActions'
import Message from '../components/Message'
import { useNavigate, useParams } from 'react-router-dom'
import ProductToCus from '../components/MenuToCusComp/ProductToCus'
import Cart from '../components/MenuToCusComp/Cart'

export const totalPriceContext = createContext({
  totalPrice: 0,
  setTotalPrice: ()=>{}
})

const MenuToCus = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const cartItems = JSON.parse(localStorage.getItem('cartItems'))
  let initialPrice = 0
  if(cartItems){
    cartItems.map((item=>{
      initialPrice = (initialPrice+(item.price*item.qty))
    }))
  }
  

  const [totalPrice, setTotalPrice] = useState(initialPrice)
  const value = {totalPrice, setTotalPrice}

  const restaurantId = params.restaurantId

  const [categoryId, setCategoryId] = useState('')

  const categoryList = useSelector((state) => state.categoryList)
  const { loading, error, categories } = categoryList

  useEffect(() => {
    dispatch(listCategories(restaurantId))
  }, [dispatch, navigate, restaurantId])

  const onCategoryButtonHandler = (chosenCategoryId) => {
    setCategoryId(chosenCategoryId)    
  }

  return (
    <totalPriceContext.Provider value={value}>
      {loading ? (
        <Spinner animation='border' />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='menu-to-cus' style={{background: '#CCF6C8', minHeight:'100vh'}}>
        <div className='menu-to-cus-header'>
          <Cart />
          <div style={{overflow:'auto', whiteSpace:"nowrap"}}  className='category-row py-2 my-2'>

            <Button className={`to-cus-white-btn mx-2 py-1 ${categoryId? '' :'category-btn'}`} onClick ={()=>{setCategoryId('')}} >Tất cả</Button>  
            {categories.map((category) => (
              
                <Button className={`to-cus-white-btn mx-2 py-1 ${categoryId===category._id? 'category-btn' :''}`} 
                  type='button'
                  onClick={() => onCategoryButtonHandler(category._id)}
                >
                  {category.name}
                </Button>              
            ))}
          </div>
          </div>
          <ProductToCus categoryId={categoryId} />
        </div>
      )}
    </totalPriceContext.Provider>
  )
}

export default MenuToCus
