import axios from "axios";
import { URL } from "../../../utilities/config";
import {
  GET_ERRORS,
  ADD_TYPE_RH,
  ADD_TYPE_BREED,
  GET_TYPES_RH,
  GET_TYPES_BREED,
  LOADING
} from "../types";

// Get (Type-Rh)
export const getAllTypeBreeds = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`${URL}/master/detail/breed`)
    .then(res =>
      dispatch({
        type: GET_TYPES_BREED,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

export const setLoading = () => {
  return {
    type: LOADING
  };
};
