import { GET_ANIMALS, GET_ANIMAL, LOADING } from "../actions/types";

const initialState = {
  animals: [],
  animal: {},
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
    case GET_ANIMAL:
      return {
        ...state,
        animal: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
