import { GET_ERRORS, GET_PROFILE, LOADING } from "./types";
import { URL } from "../../utilities/config";
import axios from "axios";

// Get profile
export const getProfileAndAdoptions = id => dispatch => {
  dispatch(setLoading());
  axios
    .get(`${URL}/master/users/profile/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setLoading = () => {
  return {
    type: LOADING
  };
};
