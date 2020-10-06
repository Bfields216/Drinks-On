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
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  data: null,
  modalType: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        data: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        data: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        data: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case PARTY_OPTIONS:
      return { ...state, data: { ...state.data, partyOption: action.payload } };
    case SET_MODAL:
      return { ...state, modalType: action.payload };
    case SET_OMW:
      return { ...state, data: { ...state.data, omwTo: action.payload } };
    case SET_ETA:
      return { ...state, data: { ...state.data, ETA: action.payload } };
    case CHECK_IN_BAR: 
      return { ...state, data: { ...state.data, checkedIn: action.payload }};
    default:
      return state;
  }
}
