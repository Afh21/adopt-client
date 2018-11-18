import { GET_ADOPTIONS, LOADING, GET_ID_ADOPTION } from "../actions/types";

const initialState = {
  adoptions: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ADOPTIONS:
      return {
        ...state,
        adoptions: action.payload,
        loading: false
      };
    case GET_ID_ADOPTION:
      return {
        ...state,
        adoptions: state.adoptions.filter(
          adoption => adoption._id !== action.payload
        )
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return { ...state };
  }
}
