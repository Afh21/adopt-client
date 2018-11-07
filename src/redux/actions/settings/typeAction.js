import axios from "axios";
import { URL } from "../../../utilities/config";
import {
  GET_ERRORS,
  // ADD_TYPE_RH,
  // GET_TYPES_RH,
  CLEAR_ERRORS,
  ADD_TYPE_BREED,
  GET_TYPES_BREED,
  LOADING,
  DELETE_TYPE_BREED
} from "../types";

// Get (Type-Rh)
export const getAllTypeBreeds = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`${URL}/master/detail/breed/type-breed`)
    .then(res =>
      dispatch({
        type: GET_TYPES_BREED,
        payload: res.data.data // Obtener la data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

export const savedTypeBreed = data => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${URL}/master/detail/breed/type-breed`, data)
    .then(res =>
      dispatch({
        type: ADD_TYPE_BREED,
        payload: res.data.data // Obtener la data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

export const deleteTypeBreed = id => dispatch => {
  axios
    .delete(`${URL}/master/detail/breed/type-breed/${id}`)
    .then(() => dispatch(getAllTypeBreeds()))
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

// clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
