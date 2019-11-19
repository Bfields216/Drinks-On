const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const config = require('config');
const path = require('path');
mongoose.Promise = Promise;

const port = process.env.PORT || 3001;
// Bodyparser Middleware
app.use(express.json());

// DB Config
// const db = config.get('mongoURI');

// const path = require("path");
const routes = require('./routes');

mongoose.connect(process.env.MONGODB_URI || config, {
useNewUrlParser: true });
const db = mongoose.connection;
// Connect to Mongo
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once('open', function() {
  console.log("MongoDB database connection successful.");
})

  // Use Routes
  app.use(routes);
app.use('/api/drinks', require('./routes/api/drinks'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));