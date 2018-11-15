import {
  REGISTER_ADMINISTRATOR,
  GET_ERRORS,
  GET_USERS,
  LOADING
} from "./types";
import { URL } from "../../utilities/config";
import axios from "axios";

export const getUsersFromAdmin = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`${URL}/master/users/`)
    .then(res =>
      dispatch({
        type: GET_USERS,
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

export const createUserFromAdmin = (userAdmin, history) => dispatch => {
  axios
    .post(`${URL}/auth/register`, userAdmin)
    .then(res =>
      dispatch(
        {
          type: REGISTER_ADMINISTRATOR,
          payload: res.data
        },
        history.push("/dashboard/users")
      )
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteUserFromAdmin = id => dispatch => {
  axios
    .delete(`${URL}/master/users/delete/${id}`)
    .then(() => dispatch(getUsersFromAdmin()))
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
