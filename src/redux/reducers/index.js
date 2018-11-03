import { combineReducers } from "redux";
import errorReducer from "./errorReducer";

// Reducers
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer
});
