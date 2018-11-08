import { GET_ERRORS, REGISTER_SUCCESSFULLY, SET_CURRENT_USER } from "./types";
import axios from "axios";

import { setAuthToken } from "../../utilities/BearerToken/setToken";
import { URL } from "../../utilities/config";
import jwt_decode from "jwt-decode";

// Register
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(`${URL}/auth/register`, userData)
    .then(res =>
      dispatch(
        {
          type: REGISTER_SUCCESSFULLY,
          payload: res.data
        },
        history.push("/login")
      )
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login  - Get User token
export const loginUser = (userData, history) => dispatch => {
  axios
    .post(`${URL}/auth/login`, userData)
    .then(res => {
      const { token } = res.data;

      // Set token to localstorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth Header
      setAuthToken(token); // Una funcion de src/utilities/
      // Decoded token
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localstorage
  localStorage.removeItem("jwtToken");

  // Remove auth header for future request
  setAuthToken(false);

  // Set Current user to {} wich set isAuthenticaded to false
  dispatch(setCurrentUser({}));
};
