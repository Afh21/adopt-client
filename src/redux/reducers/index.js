import { combineReducers } from "redux";
import errorReducer from "./errorReducer";

// Reducers
import authReducer from "./authReducer";

// Master / Detail / Type - Rh
import typeBreedReducer from "./settings/typeBreedReducer";
import typeRhReducer from "./settings/typeRhReducer";

// Animals
import animalReducer from "./animalReducer";

// Users
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  breeds: typeBreedReducer,
  rhs: typeRhReducer,
  animals: animalReducer,
  users: userReducer
});
