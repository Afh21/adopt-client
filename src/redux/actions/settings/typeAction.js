import axios from "axios";
import { URL } from "../../../utilities/config";
import {
  CLEAR_ERRORS,
  GET_ERRORS,
  ADD_TYPE_RH,
  ADD_TYPE_BREED,
  GET_TYPES_RH,
  GET_TYPES_BREED,
  LOADING
} from "../types";

//  ========================= BREEDS =================================

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

export const updateBreed = (id, values) => dispatch => {
  axios
    .put(`${URL}/master/detail/breed/type-breed/${id}`, values)
    .then(() => dispatch(getAllTypeBreeds()))
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

//  ========================= RH =================================

export const getAllTypeRhs = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`${URL}/master/detail/rh/type-rh`)
    .then(res =>
      dispatch({
        type: GET_TYPES_RH,
        payload: res.data.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

export const savedTypeRh = data => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${URL}/master/detail/rh/type-rh`, data)
    .then(res =>
      dispatch({
        type: ADD_TYPE_RH,
        payload: res.data.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

export const updateRh = (id, values) => dispatch => {
  axios
    .put(`${URL}/master/detail/rh/type-rh/${id}`, values)
    .then(() => dispatch(getAllTypeRhs()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

export const deleteTypeRH = id => dispatch => {
  axios
    .delete(`${URL}/master/detail/rh/type-rh/${id}`)
    .then(() => dispatch(getAllTypeRhs()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

//  ========================= GLOBALS =================================

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
