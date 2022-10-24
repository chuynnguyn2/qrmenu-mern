import axios from 'axios'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL, 
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        //Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/order`, order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data, 
    })
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    })
    localStorage.setItem('orderItems', JSON.stringify(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())
    // }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateOrder = (order) => async(dispatch, getState) =>{
  const {
    userLogin: { userInfo },
  } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }

  try{
    dispatch({
      type:ORDER_UPDATE_REQUEST
    })
    const {data} = await axios.put(`/api/order/${order._id}`, order, config)
    dispatch({
      type:ORDER_UPDATE_SUCCESS,
      payload: data
    })
  }
  catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        
        dispatch({
          type: ORDER_UPDATE_FAIL,
          payload: message,
        })
      }

}


export const listOrders = (restaurantId) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }

  try {
    dispatch({ type: ORDER_LIST_REQUEST })
    const { data } = await axios.get(
      `/api/order?restaurant=${restaurantId}`,
      config
    )
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// export const getOrderDetails = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: ORDER_DETAILS_REQUEST,
//     })    

//     const { data } = await axios.get(`/api/order/${id}`)

//     dispatch({
//       type: ORDER_DETAILS_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
    
//     dispatch({
//       type: ORDER_DETAILS_FAIL,
//       payload: message,
//     })
//   }
// }
