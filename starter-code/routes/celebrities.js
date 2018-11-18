const express = require('express')
const router = express.Router()
const Celebrity = require('../models/celebrity')

/* GET celeb page */

router.get('/', (req, res, next) => {
  // R in CRUD
  Celebrity.find()
    .then((result) => {
      res.render('celebrities/index', { celebrities: result })
    })
    .catch(next)
})

module.exports = router
