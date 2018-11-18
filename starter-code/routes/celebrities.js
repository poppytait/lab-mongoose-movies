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

// get celebrity by id
router.get('/:celebrityId', (req, res, next) => {
  const celebrityId = req.params.celebrityId

  Celebrity.findById(celebrityId)
    .then((celebrity) => {
      res.render('celebrities/show', { celebrity })
      console.log(celebrity)
    })
    .catch(next)
})

module.exports = router
