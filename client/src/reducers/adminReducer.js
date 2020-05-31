import {
  ADD_EVENT,
  ADD_ITEM,
  CHECKIN_USERS,
  GENERATE_PHOTOS,
} from "../actions/types";

const initialState = {
  name: "The Leaky Faucet",
  address: "123 Easy St. Atlanta, GA",
  rating: 4.5,
  users: [],
  omw: [],
  hours: null,
  drinks: [
    {
      description: "Made with real apples",
      drinkId: "ar2cv",
      drinkName: "Appletini",
      drinkPrice: 10,
      drinkThumb:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190815-appletini-0326-landscape-pf-1566334130.jpg?crop=0.668xw:1.00xh;0.184xw,0&resize=480:*",
      ingredients: [],
      instructions: "Chop the apple tini size, mix with vodka and gin",
      quantity: 1,
    },
  ],
  events: [],
  mapLocation: null,
  photos: [],
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
        photos: action.payload,
      };
    default:
      return state;
  }
}
