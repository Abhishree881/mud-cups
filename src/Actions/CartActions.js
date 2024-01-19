export const addToCart = (data) => {
  return function (dispatch) {
    dispatch({ type: 'ADD_TO_CART', newCartItem: data })
  }
}
export const removeFromCart = (index) => {
  return function (dispatch) {
    dispatch({ type: 'REMOVE_FROM_CART', index })
  }
}
