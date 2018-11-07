import { LOADING, GET_TYPES_RH, ADD_TYPE_RH } from "../../actions/types";

const initialState = {
  rhs: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TYPES_RH:
      return {
        ...state,
        rhs: action.payload,
        loading: false
      };
    case ADD_TYPE_RH:
      return {
        ...state,
        rhs: [action.payload, ...state.rhs]
      };
    default:
      return state;
  }
}
