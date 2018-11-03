import { GET_ERRORS, REGISTER_SUCCESSFULLY } from "./types";
import axios from "axios";

const url = "http://localhost:5000";
// Register
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(`${url}/auth/register`, userData)
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
