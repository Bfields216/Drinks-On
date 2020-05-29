import { UPDATE_BARS } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BARS:
      return action.payload;
    default:
      return state;
  }
}
