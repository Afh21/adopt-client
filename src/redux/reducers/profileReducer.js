import { GET_PROFILE, LOADING } from "../actions/types";

const initialState = {
  adoptions: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        adoptions: action.payload,
        loading: false
      };
    default:
      return {
        ...state
      };
  }
}
