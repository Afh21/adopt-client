import { SET_CURRENT_USER, REGISTER_SUCCESSFULLY } from "../actions/types";
import isEmpty from "../../utilities/validations/isEmpty";

const initialState = {
  isAuthenticated: {},
  user: {},
  hello: "Hola mundo"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESSFULLY:
      return {
        ...state,
        user: action.payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    default:
      return state;
  }
}
