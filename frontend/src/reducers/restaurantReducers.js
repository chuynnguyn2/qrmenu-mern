import {
  RESTAURANT_LIST_REQUEST,
  RESTAURANT_LIST_SUCCESS,
  RESTAURANT_LIST_FAIL,
  RESTAURANT_CREATE_REQUEST,
  RESTAURANT_CREATE_SUCCESS,
  RESTAURANT_CREATE_FAIL,
  RESTAURANT_EDIT_REQUEST,
  RESTAURANT_EDIT_SUCCESS,
  RESTAURANT_EDIT_FAIL,
  RESTAURANT_DELETE_REQUEST,
  RESTAURANT_DELETE_SUCCESS,
  RESTAURANT_DELETE_FAIL,
} from '../constants/restaurantConstants'

export const restaurantListReducer = (state = { restaurants: [] }, action) => {
  switch (action.type) {
    case RESTAURANT_LIST_REQUEST:
      return { loading: true, restaurants: [] }
    case RESTAURANT_LIST_SUCCESS:
      return { loading: false, restaurants: action.payload }
    case RESTAURANT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const restaurantCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_CREATE_REQUEST:
      return { loading: true }
    case RESTAURANT_CREATE_SUCCESS:
      return { loading: false, success: true, createRestaurant: action.payload }
    case RESTAURANT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const restaurantUpdateReducer = (
  state = { updateRestaurant: {} },
  action
) => {
  switch (action.type) {
    case RESTAURANT_EDIT_REQUEST:
      return { loading: true }
    case RESTAURANT_EDIT_SUCCESS:
      return { loading: false, success: true, updateRestaurant: action.payload }
    case RESTAURANT_EDIT_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const restaurantDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_DELETE_REQUEST:
      return { loading: true }
    case RESTAURANT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case RESTAURANT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
