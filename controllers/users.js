const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


// User Model
const db = require("../models");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if(!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  db.User.findOne({ email })
    .then(user => {
      if(user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new User({
        name,
        email,
        password
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                  if(err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email
                    }
                  });
                }
              )
            });
        })
      })
    })
});
router.put('/checkinBar', (req, res) => {
  const { userId, barName } = req.body;
  console.log(req.body)
  
  db.User.updateOne({ name: userId },{ checkedIn: barName })
    .then(checkedIn => {
      res.json({
        message: "User successfully checked in to Bar",
        error: false,
        data: checkedIn
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
router.get('/:id', (req, res) => {
  db.User.find({ checkedIn: req.params.id })
  .select('name')
  .then(response => {
    console.log(response);
    res.json({
      message: `Found all users at ${req.params.id}`,
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
})
module.exports = router;