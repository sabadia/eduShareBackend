const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addUserToDB = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result =>
        res.status(201).json({ message: 'User created', user: result })
      )
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
};

const login = (req, res, next) => {
  User.findOne({ username: req.body.username }).then(user => {
    if (!user) {
      res.status(401).json({ message: 'auth failed' });
    }
    return bcrypt
      .compare(req.body.password, user.password)
      .then(result => {
        if (!result) {
          res.status(401).json({ message: 'auth failed' });
        }
        const token = jwt.sign(
          { username: user.username, userId: user._id },
          'more-long-more-better-secret',
          { expiresIn: '1h' }
        );
        res
          .status(200)
          .json({ token: token, expiresIn: 3600, userId: user._id });
      })
      .catch(err => res.status(401).json({ message: 'auth failed' }));
  });
};
module.exports = {
  addUserToDB,
  login
};
