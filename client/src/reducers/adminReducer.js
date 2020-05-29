import { ADD_EVENT, ADD_ITEM, CHECKIN_USERS, GENERATE_PHOTOS } from "../actions/types";

const initialState = {
  name: "The Leaky Faucet",
  address: "123 Easy St. Atlanta, GA",
  rating: 4.5,
  users: [],
  omw: [],
  hours: null,
  drinks: [],
  events: [],
  mapLocation: null,
  photos: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
      case ADD_ITEM:
      return {
        ...state,
        drinks: [...state.drinks, action.payload],
      };
      case CHECKIN_USERS:
      return {
        ...state,
        users: action.payload,
      };
      case GENERATE_PHOTOS:
        return {
          ...state,
          photos: action.payload
        }
    default:
      return state;
  }
}
