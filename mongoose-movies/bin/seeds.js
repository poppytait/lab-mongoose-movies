const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

mongoose.connect('mongodb://localhost/celebrities', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const celebrities = [
  {
    name: 'Tina Turner',
    occupation: 'Singer',
    catchPhrase: 'Whats love got to do with it?'
  },
  {
    name: 'Whitney Houston',
    occupation: 'Singer',
    catchPhrase: 'I wanna dance with somebody'
  },
  {
    name: 'Julia Roberts',
    occupation: 'Actress',
    catchPhrase: 'I love acting'
  }
];

Celebrity.create(celebrities)
  .then(() => {
    console.log('Celebrities was created');
    mongoose.connection.close();
  })
  .catch(error => {
    console.error(error);
  })
;
