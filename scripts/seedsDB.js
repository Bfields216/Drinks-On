// const mongoose = require("mongoose");
// const db = require("../models");

// // This file empties the Books collection and inserts the books below

// mongoose.connect(
//   process.env.MONGODB_URI ||
//   "mongodb://localhost/Drink"
// );

// const drinkSeed = [
//   {
//     model: "S",
//     color: "Blue",
//     year: 2019,
//     imageURL: "https://cdcssl.ibsrv.net/autodata/images/?IMG=USC70TSC024B022001.JPG&WIDTH=660"
//   },
//   {
//     model: "X",
//     color: "Red",
//     year: 2015,
//     imageURL: "https://www.teslarati.com/wp-content/uploads/2015/09/Red-Tesla-Model-X.jpg"
//   },
//   {
//     model: "3",
//     color: "White",
//     year: 2018,
//     imageURL: "https://s.aolcdn.com/dims-global/dims3/GLOB/legacy_thumbnail/788x525/quality/85/https://s.aolcdn.com/commerce/autodata/images/USC80TSC032A021001.jpg"
//   }
// ];

// db.Drink
//   .remove({})
//   .then(() => db.Drink.collection.insertMany(drinkSeed))
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
