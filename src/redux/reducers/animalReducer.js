import { GET_ANIMALS, LOADING, ADOPT_ANIMAL } from "../actions/types";

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
    case ADOPT_ANIMAL:
      return {
        ...state,
        animals: state.animals.filter(animal => animal._id !== action.payload)
      };
    default:
      return state;
  }
}
