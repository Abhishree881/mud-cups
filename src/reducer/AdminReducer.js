const initialState = {
  franchise: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FRANCHISES":
      return Object.assign({}, state, {
        franchise: action.data,
      });
    default:
      return state;
  }
};

export default adminReducer;
