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
export const setItem = (newMenuItem, itemIndex) => {
  return function (dispatch) {
    dispatch({ type: "SET_ITEM", newMenuItem, itemIndex });
  };
};
export const setFavourite = (itemIndex) => {
  return function (dispatch) {
    dispatch({ type: "SET_FAV", itemIndex });
  };
};
export const setRecommended = (data) => {
  return function (dispatch) {
    dispatch({ type: "SET_RECOMMENDED", recommendedData: data });
  };
};
