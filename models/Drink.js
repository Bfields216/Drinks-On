var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ingredientSchema = new Schema({
  name: String,
  measure: String
});
var DrinkSchema = new Schema({
  drinkId: {
    type: String,
    required: true
  },
  drinkThumb: {
    type: String,
    required: true,
    default: "https://www.acouplecooks.com/wp-content/uploads/2019/05/Gimlet-005.jpg"
  },
  drinkName: {
    type: String,
    required: true
  },
  drinkPrice: {
    type: Number,
    required: false,
    default: 0
  },
  ingredients: [ingredientSchema],
  instructions: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  quantity: {
    type: Number,
    required: false,
    default: 0
  },
});
// This creates our model from the above schema, using mongoose's model method
const Drink = mongoose.model("Drink", DrinkSchema);
// Export the Article model
module.exports = Drink;