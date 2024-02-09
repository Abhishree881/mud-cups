const initialState = {
  menu: [],
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_MENU":
      return Object.assign({}, state, {
        menu: [...state.menu, action.newMenuItem],
      });
    case "LOAD_MENU":
      return Object.assign({}, state, {
        menu: action.data,
      });
    default:
      return state;
  }
};
export default menuReducer;
