import { legacy_createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  categoryListReducer,
  categoryCreateReducer,
  categoryUpdateReducer,
  categoryDeleteReducer,
} from './reducers/categoryReducers.js'
import {
  userLoginReducer,
  userDetailsReducer,
} from './reducers/userReducers.js'
import {
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers.js'
import {
  restaurantListReducer,
  restaurantCreateReducer,
  restaurantUpdateReducer,
  restaurantDeleteReducer,
} from './reducers/restaurantReducers.js'
import {
  productListReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer,
} from './reducers/productReducers.js'
import { orderCreateReducer,orderDetailsReducer,orderListReducer } from './reducers/orderReducers.js'
import { cartReducers } from './reducers/cartReducers.js'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,

  restaurantList: restaurantListReducer,
  createRestaurant: restaurantCreateReducer,
  editRestaurant: restaurantUpdateReducer,
  deleteRestaurant: restaurantDeleteReducer,

  categoryList: categoryListReducer,
  createCategory: categoryCreateReducer,
  editCategory: categoryUpdateReducer,
  deleteCategory: categoryDeleteReducer,

  productList: productListReducer,
  createProduct: productCreateReducer,
  editProduct: productUpdateReducer,
  deleteProduct: productDeleteReducer,

  order: orderCreateReducer,
  orderDetail: orderDetailsReducer,
  orderList: orderListReducer,  

  cart: cartReducers,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
  
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  cart: {cartItems: cartItemsFromStorage},  
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
