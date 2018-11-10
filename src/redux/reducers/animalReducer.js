import { GET_ANIMALS, LOADING } from "../actions/types";

const initialState = {
  animals: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ANIMALS:
      return {
        ...state,
        animals: action.payload,
        loading: false
      };
    default:
      return state;
  }
}