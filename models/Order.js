var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;
var ingredientSchema = new Schema({
  name: String,
  measure: String
});
var drinkSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  _v: {
    type: Number,
    required: false
  },
  drinkId: {
    type: String,
    required: true
  },
  drinkThumb: {
    type: String,
    required: true
  },
  drinkName: {
    type: String,
    required: true
  },
  ingredients: [ingredientSchema],
  glass: {
    type: String,
    required: false
  },
  instructions: {
    type: String,
    required: true
  }
});
var OrderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  order: [drinkSchema],
  accepted: {
    type: Boolean,
    required: true,
    default: false
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  }
});

// This creates our model from the above schema, using mongoose's model method
const Order = mongoose.model("Order", OrderSchema);

// Export the Article model
module.exports = Order;
