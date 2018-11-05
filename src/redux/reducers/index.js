import { combineReducers } from "redux";
import errorReducer from "./errorReducer";

// Reducers
import authReducer from "./authReducer";

// Master / Detail / Type - Rh
import typeReducer from "../reducers/settings/typeReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  rhs: typeReducer
});
