'use strict';

const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity');

/* GET celeb page. */
router.get('/', function (req, res, next) {
  Celebrity.find()
    .then((result) => {
      res.render('celebrities/index', { celebrities: result });
    })
    .catch(next);
});

router.get('/new', (req, res, next) => {
  res.render('celebrities/create-celebrity');
});

router.post('/', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(result => {
      res.redirect('celebrities');
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((result) => {
      console.log(result);
      res.render('celebrities/celebrity-detail', { celebrity: result });
    })
    .catch(next);
});

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((result) => {
      console.log(result);
      res.render('celebrities/edit-celebrity', { celebrity: result });
    })
    .catch(next);
});

router.post('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(id, { $set: req.body })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(next);
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findByIdAndRemove(id)
    .then(result => {
      res.redirect('/celebrities');
    })
    .catch(next);
});

module.exports = router;
