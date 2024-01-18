export const addToCart = (data) => {
  return function (dispatch) {
    dispatch({ type: 'ADD_TO_CART', newCartItem: data })
  }
}