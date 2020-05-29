import axios from "axios";
import { returnErrors } from "./errorActions";
import { UPDATE_BARS } from "./types";

//Get bars from search results

//add additional keys: drinkers, OMW, featDrinks, events

//check if bars exist in DB and pull data from there

//add to Bars Store
export const storeBars = (barsArray) => async (dispatch) => {
  let bars = [];
  await barsArray.map((bar, i) => {
    let currentBar = {};
    currentBar.name = bar.name;
    currentBar.address = bar.vicinity;
    currentBar.rating = bar.rating;
    currentBar.price_level = bar.price_level;
    currentBar.users = [];
    currentBar.omw = [];
    currentBar.hours = bar.opening_hours;
    currentBar.drinks = [];
    currentBar.events = [];
    currentBar.mapLocation = bar.geometry.location;
    bars.push(currentBar);
  });
  console.log(bars);
  dispatch({
    type: UPDATE_BARS,
    payload: bars,
  });
};
//clear store on new search query
