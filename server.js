const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const app = express();
// const io = require("socket.io")();
// const http = require('http');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());
// const path =
const PORT = process.env.PORT || 3001;

const models = require("./config/keys").MONGODB_URI
// DB Config
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const drinks = require("./routes/api/drinks");
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());


// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB users successfully connected"))
  .catch(err => console.log(err));

  // mongoose
  // .connect(
  //   models,
  //   { useNewUrlParser: true }
  // )
  // .then(() => console.log("MongoDB models successfully connected"))
  // .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/drinks", drinks)

// app.get("/bartender/orders", function(req, res) {
//   models.Order.find({})
//     .then(allOrders => {
//       res.json({
//         message: "Requested all Orders",
//         error: false,
//         data: allOrders
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.json({
//         message: err.message,
//         error: true
//       });
//     }); 
// });

// app.get("/order-summary", function(req, res) {
//   models.Drink.find({})
//     .then(allDrinks => {
//       console.log(allDrinks);
//       res.json({
//         message: "Requested all Drinks",
//         error: false,
//         data: allDrinks
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.json({
//         message: err.message,
//         error: true
//       });
//     });
// });

// app.post("/order-summary", function(req, res) {
//   models.Order.create(req.body)
//     .then(newOrder => {
//       console.log("New Order: ", newOrder);
//       res.json({
//         message: "Successfully created",
//         error: false,
//         data: newOrder
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.json({
//         message: err.message,
//         error: true
//       });
//     });
// });
// app.delete("/order-summary/drink/:id", function(req, res) {
//   models.Drink.deleteOne({ _id: req.params.id })
//     .then(response => {
//       // console.log(response);
//       res.json({
//         message: `Deleted drink with id: ${req.params.id}`,
//         error: false,
//         data: response
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.json({
//         message: err.message,
//         error: true
//       });
//     });
// });
// app.post("/api/new", function(req, res) {
//   models.Drink.create(req.body)
//     .then(newDrink => {
//       console.log("New Drink: ", newDrink);
//       res.json({
//         message: "Successfully created",
//         error: false,
//         data: newDrink
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.json({
//         message: err.message,
//         error: true
//       });
//     });
// });

app.use(express.static(__dirname + "/client/build"));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });

app.listen(PORT, function() {
  console.log(`App is running on http://localhost:${PORT}`);
});


// const port = process.env.PORT || 8080;

// app.listen(port, () => console.log(`Server up and running on port ${port} !`));
