// rootReducer.js
import { combineReducers } from "redux";
import cartReducer from "./CartReducer";
import menuReducer from "./MenuReducer";
import adminReducer from "./AdminReducer";

const rootReducer = combineReducers({
  cartReducer: cartReducer,
  menuReducer: menuReducer,
  adminReducer: adminReducer,
});

export default rootReducer;
