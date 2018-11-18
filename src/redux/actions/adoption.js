import {
  GET_ADOPTIONS,
  LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_ID_ADOPTION
} from "./types";
import { URL } from "../../utilities/config";
import axios from "axios";

export const getAdoptions = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`${URL}/adoption/request`)
    .then(res =>
      dispatch({
        type: GET_ADOPTIONS,
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

export const acceptAdoption = id => dispatch => {
  axios
    .post(`${URL}/adoption/request/adoption/accept/${id}`)
    .then(() => dispatch(getAdoptions()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

export const deleteAdoption = id => dispatch => {
  axios
    .delete(`${URL}/adoption/request/adoption/${id}`)
    .then(() =>
      dispatch({
        type: GET_ID_ADOPTION,
        payload: id
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

// clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
