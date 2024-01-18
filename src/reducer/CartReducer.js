const initialState = {
  currentCart: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return Object.assign({}, state, {
        currentCart: [...state.currentCart, action.newCartItem]
      });

    default:
      return state;
  }
};

export default cartReducer;
