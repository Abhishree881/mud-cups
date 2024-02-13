import { updateCartDb } from "./CartDabase";
export const addToCart = (data) => {
  return async function (dispatch, getState) {
    await dispatch({ type: "ADD_TO_CART", newCartItem: data.activeItem });
    updateCartDb(data.currentUser, getState().cartReducer.currentCart);
  };
};
export const removeFromCart = (data) => {
  return async function (dispatch, getState) {
    await dispatch({ type: "REMOVE_FROM_CART", index: data.index });
    updateCartDb(data.currentUser, getState().cartReducer.currentCart);
  };
};
export const updateCart = (data) => {
  return async function (dispatch, getState) {
    await dispatch({
      type: "UPDATE_ITEM",
      newItem: data.newItem,
      index: data.index,
    });
    updateCartDb(data.currentUser, getState().cartReducer.currentCart);
  };
};
export const setActiveItem = (data) => {
  return function (dispatch) {
    dispatch({ type: "SET_ACTIVE_ITEM", newActiveItem: data });
  };
};
export const setCart = (data) => {
  return function (dispatch) {
    dispatch({ type: "SET_CART", currentCart: data });
  };
};

export const setUserName = (data) => {
  return function (dispatch) {
    dispatch({ type: "setUserName", userName: data });
  };
};
