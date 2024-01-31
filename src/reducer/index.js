// rootReducer.js
import { combineReducers } from "redux";
import cartReducer from "./CartReducer";
import menuReducer from "./MenuReducer";

const rootReducer = combineReducers({
  cartReducer: cartReducer,
  menuReducer: menuReducer
});

export default rootReducer;
