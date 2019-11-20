const express = require("express");
const router = express.Router();
// const auth = require('../../middleware/auth');


// Load User model
const db = require("../models");

router.get("/bartender/orders", function(req, res) {
  db.Order.find({})
    .then(allOrders => {
      res.json({
        message: "Requested all Orders",
        error: false,
        data: allOrders
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        message: err.message,
        error: true
      });
    });
});

router.get("/order-summary", function(req, res) {
  db.Drink.find({})
    .then(allDrinks => {
      console.log(allDrinks);
      res.json({
        message: "Requested all Drinks",
        error: false,
        data: allDrinks
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        message: err.message,
        error: true
      });
    });
});

router.post("/order-summary", function(req, res) {
  db.Order.create(req.body)
    .then(newOrder => {
      console.log("New Order: ", newOrder);
      res.json({
        message: "Successfully created",
        error: false,
        data: newOrder
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        message: err.message,
        error: true
      });
    });
});
router.delete("/order-summary/drink/:id", function(req, res) {
  db.Drink.deleteOne({ _id: req.params.id })
    .then(response => {
      // console.log(response);
      res.json({
        message: `Deleted drink with id: ${req.params.id}`,
        error: false,
        data: response
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        message: err.message,
        error: true
      });
    });
});
router.post("/new", function(req, res) {
  console.log("You hit the api new route");
  console.log(req.body);
  db.Drink.create(req.body)
    .then(newDrink => {
      console.log("New Drink: ", newDrink);
      res.json({
        message: "Successfully created",
        error: false,
        data: newDrink
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        message: err.message,
        error: true
      });
    });
});

module.exports = router;
