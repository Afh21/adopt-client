import { LOADING, GET_TYPES_BREED, ADD_TYPE_BREED } from "../../actions/types";

const initialState = {
  breeds: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TYPES_BREED:
      return {
        ...state,
        breeds: action.payload,
        loading: false
      };
    case ADD_TYPE_BREED:
      return {
        ...state,
        breeds: [action.payload, ...state.breeds]
      };
    default:
      return state;
  }
}
