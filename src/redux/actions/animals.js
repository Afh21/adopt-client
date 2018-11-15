import { GET_ANIMALS, LOADING, GET_ERRORS, CLEAR_ERRORS } from "./types";
import { URL } from "../../utilities/config";
import axios from "axios";

export const getAnimals = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`${URL}/master/animal/`)
    .then(res =>
      dispatch({
        type: GET_ANIMALS,
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

export const savedAnimal = (data, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${URL}/master/animal/create`, data)
    .then(() =>
      // dispatch({ type: ADD_ANIMAL, payload: res.data.data  })
      history.push("/dashboard/animals")
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

export const deleteAnimal = id => dispatch => {
  axios
    .delete(`${URL}/master/animal/delete/${id}`)
    .then(() => dispatch(getAnimals()))
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
