import { combineReducers } from "redux";
import errorReducer from "./errorReducer";

// Reducers
import authReducer from "./authReducer";

// Master / Detail / Type - Rh
import typeBreedReducer from "./settings/typeBreedReducer";
import typeRhReducer from "./settings/typeRhReducer";

// Animals
import animalReducer from "./animalReducer";

// Adoptions
import adoptionReducer from "./adoptionReducer";

// Profile
import profileReducer from "./profileReducer";

// Users
import userReducer from "./userReducer";

// Dashboard
import dashboardReducer from "./dashboardReducer";

export default combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  error: errorReducer,
  breeds: typeBreedReducer,
  rhs: typeRhReducer,
  animals: animalReducer,
  adoptions: adoptionReducer,
  users: userReducer,
  profile: profileReducer
});
