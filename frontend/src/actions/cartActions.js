import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart = (user, id, qty) => async (dispatch) => {
  const { data } = await axios.get(`/api/product/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.id,
      name: data.name,
      image: data.imgUrl,
      price: data.price,
      qty: qty,
    },
  })
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })
  console.log(id)

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
