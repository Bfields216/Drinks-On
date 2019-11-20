const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const config = require('config');
const path = require('path');
const DrinksController = require("./controllers/drinks");
const UsersController = require("./controllers/users");
const AuthController = require("./controllers/auth");

const db = require("./models");

// Bodyparser Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("dotenv").config();

mongoose.set("useCreateIndex", true);
// Connect to Mongo
mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true });

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose connected successfully");
});
connection.on("error", err => {
  console.log("Mongoose default connection error: " + err);
});

  // Use Routes
  app.use('/api/drinks', DrinksController);
  app.use('/api/users', UsersController);
  app.use('/api/auth', AuthController);
  

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log(`App is running on http://localhost:${PORT}`);
});