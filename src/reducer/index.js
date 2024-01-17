// rootReducer.js
import { combineReducers } from "redux";
import cartReducer from "./CartReducer";

const rootReducer = combineReducers({
  cartReducer: cartReducerReducer,
});

export default rootReducer;
