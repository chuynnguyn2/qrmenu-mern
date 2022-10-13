import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { listCategories } from '../../actions/categoryActions'
import { listProducts } from '../../actions/productActions'
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
  const {loading: loadingEditCat, success: successEditCat, updateCategory} = editCats
  const deleteCats = useSelector((state)=>state.deleteCategory)
  const {loading: loadingDeleteCat, success: successDeleteCat, deleteCategory} = deleteCats

  const createPro = useSelector((state) => state.createProduct)
  const {
    loading: loadingCreatePro,
    success: successCreatePro,
    createPRODUCT: createProduct,
  } = createPro
  const editPro = useSelector((state)=>state.editProduct)
  const {loading: loadingEditPro, success: successEditPro, updateProduct} = editPro
  const deletePro = useSelector((state)=>state.deleteProduct)
  const {loading: loadingDeletePro, success: successDeletePro, catId} = deletePro
  
  
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
    if (successCreatePro){
      dispatch(listProducts(createProduct.category))
    }
    if(successEditPro ){
      dispatch(listProducts(updateProduct.category))
    }
    if(successDeletePro){
      dispatch(listProducts(catId))
    }

  }, [dispatch, navigate, selectResId, successCreateCat, successEditCat, successDeleteCat, userInfo, successCreatePro, successEditPro, successDeletePro])

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
