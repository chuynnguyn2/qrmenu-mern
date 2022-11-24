import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_EDIT_REQUEST,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_EDIT_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
} from '../constants/categoryConstants'
import axios from 'axios'

export const listCategories = (userUID) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST })
    const { data } = await axios.get(`/api/category?user=${userUID}`)
    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    })
    localStorage.removeItem('categoryList')
    localStorage.setItem('categoryList', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createCategory = (name, user) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    await axios.post(`api/category`, { name, user }, config)
    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_EDIT_REQUEST,
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

    const { data } = await axios.put(`/api/category`, category, config)

    dispatch({
      type: CATEGORY_EDIT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCategory =
  ({ id, user }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CATEGORY_DELETE_REQUEST,
      })
      await axios.delete(`/api/category`, { data: { id: id, user: user } })

      dispatch({
        type: CATEGORY_DELETE_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: CATEGORY_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
