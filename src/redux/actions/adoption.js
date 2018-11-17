import { GET_ADOPTIONS, LOADING, GET_ERRORS, CLEAR_ERRORS } from "./types";
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
