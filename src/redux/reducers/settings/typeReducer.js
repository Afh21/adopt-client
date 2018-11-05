import { GET_TYPES_BREED, LOADING } from "../../actions/types";

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
    default:
      return state;
  }
}
