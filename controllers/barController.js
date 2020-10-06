const db = require("../models");
const express = require("express");
const router = express.Router();
var axios = require("axios");
require("dotenv").config();
const googleApiKey = process.env.GOOGLE_API_KEY

router.get("/search_nearby/:latitude/:longitude", (req, res) => {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.latitude},${req.params.longitude}&radius=8500&type=bar&key=${googleApiKey}`
    ) //Search for bars (&type) within 5 miles/8500 meter(&radius) of the users location(?location)
    .then((response) => {
      return res.send(response.data.results);
    });
});
router.get("/search/:location", (req, res) => {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.location}&key=${googleApiKey}`
    )
    .then((response) => {
      return res.send(response.data);
    });
});
module.exports = router;
