import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { listCategories } from '../actions/categoryActions'
import Message from '../components/Message'
import { useNavigate, useParams } from 'react-router-dom'
import ProductToCus from '../components/MenuToCusComp/ProductToCus'
import Cart from '../components/MenuToCusComp/Cart'

const MenuToCus = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
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
    <>
      {loading ? (
        <Spinner animation='border' />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Cart />
          <div style={{overflow:'auto', whiteSpace:"nowrap"}} >

            <Button className='light-btn mx-2 py-1' onClick ={()=>{setCategoryId('')}} >Tất cả</Button>  
            {categories.map((category) => (
              
                <Button className='light-btn mx-2 py-1'
                  type='button'
                  onClick={() => onCategoryButtonHandler(category._id)}
                >
                  {category.name}
                </Button>
              
            ))}
          </div>
          <ProductToCus categoryId={categoryId} />
        </>
      )}
    </>
  )
}

export default MenuToCus
