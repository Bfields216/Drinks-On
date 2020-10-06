import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PARTY_OPTIONS,
  SET_MODAL,
  SET_OMW,
  SET_ETA,
  CHECK_IN_BAR
} from "./types";
import { get } from "mongoose";
// Toggle Modal
export const toggleModal = (modalType) => (dispatch) => {
  if (modalType) {
    dispatch({ type: SET_MODAL, payload: modalType });
  } else {
    dispatch({ type: SET_MODAL, payload: false });
  }
};
// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get(`/api/user/loadUser/${tokenConfig(getState)}`)
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register User
export const register = ({ name, email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/user", body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Login User
export const login = ({ email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/user/login", body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.user,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Change User Party Options
export const changePartyOptions = (partyOptions) => (dispatch) => {
  dispatch( {
    type: PARTY_OPTIONS,
    payload: partyOptions,
  })
};

// Set which bar user is OMW
export const setOMW = (barName) => (dispatch) => {
  dispatch({
    type: SET_OMW,
    payload: barName
  })
}
export const setETA = (eta) => (dispatch) => {
  dispatch({
    type: SET_ETA,
    payload: eta
  })
}
export const checkIntoBar = (barName) => (dispatch) => {
  dispatch({
    type: CHECK_IN_BAR,
    payload: barName
  })
}
// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().user.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    console.log("token", token);
    config.headers["x-auth-token"] = token;
    return config;
  } else {
    return null;
  }
};
