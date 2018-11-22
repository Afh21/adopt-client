import { DATA_DASHBOARD, LOADING } from "../actions/types";

const initialState = {
  dashboard: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DATA_DASHBOARD:
      return {
        ...state,
        dashboard: action.payload,
        loading: false
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
