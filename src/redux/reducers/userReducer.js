import { GET_USERS, LOADING } from "../actions/types";

const initialState = {
  users: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };

    default:
      return {
        ...state
      };
  }
}
