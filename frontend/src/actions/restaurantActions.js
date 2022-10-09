import {
  RESTAURANT_LIST_REQUEST,
  RESTAURANT_LIST_SUCCESS,
  RESTAURANT_LIST_FAIL,
  RESTAURANT_CREATE_REQUEST,
  RESTAURANT_CREATE_SUCCESS,
  RESTAURANT_CREATE_FAIL,
  RESTAURANT_EDIT_REQUEST,
  RESTAURANT_EDIT_FAIL,
  RESTAURANT_DELETE_REQUEST,
  RESTAURANT_DELETE_SUCCESS,
  RESTAURANT_DELETE_FAIL,
  RESTAURANT_EDIT_SUCCESS,
} from '../constants/restaurantConstants'
import axios from 'axios'

export const listRestaurants = (userId) => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_LIST_REQUEST })
    const { data } = await axios.get(`/api/restaurant?user=${userId}`)
    dispatch({
      type: RESTAURANT_LIST_SUCCESS,
      payload: data,
    }) 
    localStorage.removeItem('restaurantList')
    localStorage.setItem('restaurantList', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: RESTAURANT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const restaurantCreate =
  (name, user, address, phone) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RESTAURANT_CREATE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        `api/restaurant?user=${user}`,
        { name, user, address, phone },
        config
      )
      dispatch({
        type: RESTAURANT_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: RESTAURANT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateRestaurant = (restaurant) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESTAURANT_EDIT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/restaurant/${restaurant._id}`,
      restaurant,
      config
    )

    dispatch({
      type: RESTAURANT_EDIT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESTAURANT_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteRestaurant = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESTAURANT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/restaurant/${id}`, config)

    dispatch({
      type: RESTAURANT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: RESTAURANT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
