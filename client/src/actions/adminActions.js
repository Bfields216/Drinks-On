// import axios from "axios";
import faker from "faker";
// import { returnErrors } from "./errorActions";
import { ADD_EVENT, ADD_ITEM, CHECKIN_USERS, GENERATE_PHOTOS } from "./types";

//add event to Store
export const storeEvent = (eventObject) => async (dispatch) => {
  dispatch({
    type: ADD_EVENT,
    payload: eventObject,
  });
};
export const storeItem = (itemObject) => async (dispatch) => {
  dispatch({
    type: ADD_ITEM,
    payload: itemObject,
  });
};
export const randomizeUsers = () => (dispatch) => {
  let users = [];
  for (let i = 0; i < 10; i++) {
    const user = {
      name: faker.name.findName(),
      avatar: faker.image.avatar(),
      party: Math.random() < 0.5,
      messages: Math.random() < 0.5,
      buy_drinks: Math.random() < 0.5,
    };
    users.push(user);
  }
  dispatch({
    type: CHECKIN_USERS,
    payload: users,
  });
};
export const randomizePhotos = () => (dispatch) => {
  let photos = [];
  for (let i = 0; i < 10; i++) {
    const photo = {
        img: faker.image.image()
    }
    photos.push(photo);
  }
  dispatch({
    type: GENERATE_PHOTOS,
    payload: photos,
  });
};
//clear store on new search query
