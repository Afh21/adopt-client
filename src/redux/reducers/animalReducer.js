import {
  GET_ANIMALS,
  LOADING,
  ADOPT_ANIMAL,
  GET_PROFILE_ANIMAL,
  GET_LISTS_ANIMALS_ADOPTED_PENDING
} from "../actions/types";

const initialState = {
  animals: [],
  animal: {},
  listAnimals: [],
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
    case GET_LISTS_ANIMALS_ADOPTED_PENDING:
      return {
        ...state,
        listAnimals: action.payload,
        loading: false
      };
    case GET_PROFILE_ANIMAL:
      return {
        ...state,
        animal: Object.assign({}, ...action.payload), // Destruir [{}] por { }, osea cambiar un array de objetos, por un objeto
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
