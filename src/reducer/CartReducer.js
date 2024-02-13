const initialState = {
  currentCart: [],
  activeItem: {},
  userName: "",
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return Object.assign({}, state, {
        currentCart: [...state.currentCart, action.newCartItem],
      });
    case "REMOVE_FROM_CART":
      const indexToRemove = action.index;
      return Object.assign({}, state, {
        currentCart: state.currentCart.filter(
          (item, index) => index !== indexToRemove
        ),
      });
    case "UPDATE_ITEM":
      const { newItem, index } = action;
      const newCart = state.currentCart.map((item, idx) =>
        idx !== index ? item : newItem
      );
      return { ...state, currentCart: newCart };
    case "SET_ACTIVE_ITEM":
      return Object.assign({}, state, {
        activeItem: action.newActiveItem,
      });
    case "SET_CART":
      return Object.assign({}, state, {
        currentCart: action.currentCart,
      });
    case "setUserName":
      return Object.assign({}, state, {
        userName: action.userName,
      });
    default:
      return state;
  }
};

export default cartReducer;
