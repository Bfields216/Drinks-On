const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const app = express();
const config = require("./config/keys");
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
// const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const drinks = require("./routes/api/drinks");
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
if (process.env.NODE_ENV ==="production") {
  app.use(express.static("client/build"));
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://drinks:drinks12@ds129946.mlab.com:29946/heroku_25hpt8pv");
// Connect to MongoDB
// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log("MongoDB users successfully connected"))
//   .catch(err => console.log(err));

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

/
app.use(express.static(__dirname + "/client/build"));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });

app.listen(PORT, function() {
  console.log(`App is running on http://localhost:${PORT}`);
});


// const port = process.env.PORT || 8080;

// app.listen(port, () => console.log(`Server up and running on port ${port} !`));
