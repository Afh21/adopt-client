import {
  GET_ANIMALS,
  LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
  ADOPT_ANIMAL,
  GET_PROFILE_ANIMAL,
  GET_LISTS_ANIMALS_ADOPTED_PENDING
} from "./types";
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

export const getProfileAnimal = id => dispatch => {
  axios
    .get(`${URL}/master/animal/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE_ANIMAL,
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

export const getListAnimalsAdoptedAndPending = () => dispatch => {
  axios
    .get(`${URL}/master/animal/other/animals`)
    .then(res =>
      dispatch({
        type: GET_LISTS_ANIMALS_ADOPTED_PENDING,
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

// Este método no se implementó al fin... por que se hizo por ajax en la edicion del animal.
export const updatePhotoAnimal = (id, values, history) => dispatch => {
  axios
    .post(`${URL}/master/animal/update/photo/${id}`, values)
    .then(() => history.push("/dashboard/animals"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

export const updateAnimal = (id, values, history) => dispatch => {
  axios
    .put(`${URL}/master/animal/edit/${id}`, values)
    .then(() => history.push("/dashboard/animals"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

export const adoptAnimal = id => dispatch => {
  axios
    .post(`${URL}/adoption/request/adoption?animal=${id}`)
    .then(() =>
      dispatch({
        type: ADOPT_ANIMAL,
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
