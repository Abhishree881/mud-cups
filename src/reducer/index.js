// rootReducer.js
import { combineReducers } from "redux";
import cartReducer from "./CartReducer";
import { ThunkMiddleware } from "redux-thunk";

const rootReducer = combineReducers({
  cartReducer: cartReducer,
});

export default rootReducer;
