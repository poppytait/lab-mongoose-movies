'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

// upon post return this. post is the username and password entered

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.redirect('/auth/signup');
  }
  User.findOne({ username })
    .then((user) => {
      if (user) {
        return res.redirect('auth/signup');
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      return User.create({
        username,
        password: hashedPassword
      })
        .then((newUser) => {
          req.currentUser = newUser;
          res.redirect('/celebrities');
        })
        .catch(next);
    })
    .catch(next);
});

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.redirect('/auth/login');
  }
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return res.redirect('/auth/login');
      }
      if (bcrypt.compareSync(password /* provided password */, user.password/* hashed password */)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect('/celebrities/new');
      } else {
        res.redirect('/auth/login');
      }
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/celebrities');
});

module.exports = router;
