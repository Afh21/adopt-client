import { GET_ADOPTIONS, LOADING } from "../actions/types";

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
    case LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return { ...state };
  }
}
