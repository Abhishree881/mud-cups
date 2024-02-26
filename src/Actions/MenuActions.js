import { updateFavourites } from "./MenuDatabase";
export const addToMenu = (data) => {
  return function (dispatch) {
    dispatch({ type: "ADD_TO_MENU", newMenuItem: data });
  };
};
export const loadMenu = (data) => {
  return function (dispatch) {
    dispatch({ type: "LOAD_MENU", data });
  };
};
export const loadFav = (data) => {
  return function (dispatch) {
    dispatch({ type: "LOAD_FAV", data });
  };
};
export const setItem = (newMenuItem, itemIndex) => {
  return function (dispatch) {
    dispatch({ type: "SET_ITEM", newMenuItem, itemIndex });
  };
};
export const setFavourite = (currentUser, itemIndex) => {
  return async function (dispatch, getState) {
    await dispatch({ type: "SET_FAV", itemIndex });
    updateFavourites(currentUser, getState().menuReducer.favourites)
  };
};
export const setRecommended = (data) => {
  return function (dispatch) {
    dispatch({ type: "SET_RECOMMENDED", recommendedData: data });
  };
};
