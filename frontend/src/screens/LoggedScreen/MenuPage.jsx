import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { listCategories } from '../../actions/categoryActions'
import { listRestaurants } from '../../actions/restaurantActions'
import MenuDetail from '../../components/MenuComp/MenuDetail'

const MenuPage = () => {  
  const res = useSelector((state)=>state.restaurantList)
  const {loading, success, restaurants} = res
  const [selectResId, setSelectResId] = useState()

  const cats = useSelector((state)=>state.categoryList)
  const {loading:loadingCat, error:errorCat, categories} = cats

  console.log(categories)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const createCat = useSelector((state) => state.createCategory)
  const {
    loading: loadingCreateCat,
    success: successCreateCat,
    createCategory: createCate,
  } = createCat
  const editCats = useSelector((state)=>state.editCategory)
  const {loading: loadingEditCat, success: successEditCat, editCategory} = editCats
  const deleteCats = useSelector((state)=>state.deleteCategory)
  const {loading: loadingDeleteCat, success: successDeleteCat, deleteCategory} = deleteCats
  
  
  useEffect(() => {
    if (userInfo === null) {
      navigate('/login')
    } else {
      dispatch(listRestaurants(userInfo._id))      
    }    
    if (successCreateCat|| successEditCat || successDeleteCat) {
      dispatch(listCategories(selectResId))            
      //setCategory(categories.filter((cat) => cat.restaurant === resId.resId))      
    }
  }, [dispatch, navigate, selectResId, successCreateCat,successEditCat, successDeleteCat ,userInfo])

  return (
    <div className='menu-screen'>
      <h3>Quản lý Menu của bạn</h3>
      <div className='restaurant-section mt-4 u-margin-bottom-small'>
        <Form.Group controlId='selectRes'>
          <Form.Label>Bạn đang xem Menu của nhà hàng</Form.Label>{' '}
          <Form.Select
            value={selectResId}
            onChange={(e) => {
              setSelectResId(e.target.value)
              dispatch(listCategories(e.target.value))
            }}
            style={{ display: 'inline-block', width: '15%' }}
          >          
          <option value={0}>Chọn Nhà Hàng</option>
            {restaurants.map((res, index) => (
              <option value={res._id}>{res.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>      
      {(categories && categories.length>0)&&(<MenuDetail resId={selectResId}></MenuDetail>)}
    </div>
  )
}

export default MenuPage
