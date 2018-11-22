import { DATA_DASHBOARD, LOADING, GET_ERRORS } from "./types";
import { URL } from "../../utilities/config";
import axios from "axios";

export const getDataForDashboard = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`${URL}/dashboard/all`)
    .then(res =>
      dispatch({
        type: DATA_DASHBOARD,
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
