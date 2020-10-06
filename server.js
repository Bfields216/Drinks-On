const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
// const config = require('config');
const path = require('path');
const DrinksController = require("./controllers/drinksController");
const UsersController = require("./controllers/userController");
const BarController = require("./controllers/barController");

const db = require("./models");

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("dotenv").config();

// Connect to Mongo
mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.on("connected", () => {
  console.log("Mongoose connected successfully");
});
connection.on("error", err => {
  console.log("Mongoose default connection error: " + err);
});

  // Use Routes
  app.use('/api/drinks', DrinksController);
  app.use('/api/user', UsersController);
  app.use('/bars', BarController);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(PORT, function() {
  console.log(`App is running on http://localhost:${PORT}`);
});