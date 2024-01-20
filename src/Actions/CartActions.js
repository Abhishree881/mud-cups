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
export const updateCart = (newItem, index) => {
  return function (dispatch) {
    dispatch({ type: 'UPDATE_ITEM', newItem, index })
  }
}
export const moveToTop = (index) => {
  return function (dispatch) {
    dispatch({ type: 'MOVE_TO_TOP', index })
  }
}