const initialState = {
  currentCart: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return Object.assign({}, state, {
        currentCart: [...state.currentCart, action.newCartItem]
      });
    case "REMOVE_FROM_CART":
      const indexToRemove = action.index;
      return Object.assign({}, state, {
        currentCart: state.currentCart.filter((item, index) => index !== indexToRemove)
      });
    default:
      return state;
  }
};

export default cartReducer;
