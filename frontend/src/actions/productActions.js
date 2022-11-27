import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from '../constants/productConstants'
import axios from 'axios'

export const listProducts = (userUID) => async (dispatch, getState) => {
  // const {
  //   userLogin: { userInfo },
  // } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${userInfo.token}`,
    },
  }

  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await axios.get(`/api/product?user=${userUID}`, config)
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const productCreate =
  ({ name, user, id, cat, imgUrl, description, price, isHot, material }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `api/product`,
        {
          user: user,
          cat: cat,
          id: id,
          name: name,
          description: description,
          imgUrl: imgUrl,
          isHot: isHot,
          material: material,
          price: price,
        },
        config
      )
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_EDIT_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await axios.put(`/api/product`, product, config)

    dispatch({
      type: PRODUCT_EDIT_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProduct =
  ({ id, user }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_DELETE_REQUEST,
      })

      await axios.delete(`/api/product`, { data: { id: id, user: user } })

      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
