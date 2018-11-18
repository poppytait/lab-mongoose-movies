const mongoose = require('mongoose')
const Celebrity = require('../models/celebrity')

mongoose.connect('mongodb://localhost/starter-code', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
})

const celebrities = [
  {
    name: 'kylie jenner',
    occupation: 'make up mogul',
    catchPhrase: 'lipgloss fashion'
  },

  {
    name: 'michelle obama',
    occupation: 'old first lady',
    catchPhrase: 'education for girls'
  },

  {
    name: 'david beckham',
    occupation: 'footballer',
    catchPhrase: 'i love to kick the ball'
  }
]

Celebrity.create(celebrities)
  .then(() => {
    console.log(celebrities)
  })
  .catch(err => {
    console.error(err)
  })
