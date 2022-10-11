import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { listCategories } from '../../actions/categoryActions'
import MenuDetail from '../../components/MenuComp/MenuDetail'

const MenuPage = () => {
  const restaurants = JSON.parse(localStorage.getItem('restaurantList'))
  const [selectResId, setSelectResId] = useState(restaurants[0]._id)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin  
   
  useEffect(() => {
    if (userInfo === null) {
      navigate('/login')
    } else {
      //dispatch(listCategories(selectResId))
    }
  }, [dispatch, navigate, selectResId, userInfo])

  return (
    <div className='menu-screen'>
      <h3>Quản lý Menu của bạn</h3>
      <div className='restaurant-section mt-4'>
        <Form.Group controlId='selectRes'>
          <Form.Label >Bạn đang xem Menu của nhà hàng</Form.Label> {' '}
          <Form.Select value= {selectResId}onChange={(e)=>{setSelectResId(e.target.value)
          }} style={{display:'inline-block', width:"10%"}}>
          {restaurants.map((res)=>(
            <option value={res._id}>{res.name}</option>
          ))}
          </Form.Select>
        </Form.Group>
      </div>
      <MenuDetail resId = {selectResId}></MenuDetail>
    </div>
  )
}

export default MenuPage
