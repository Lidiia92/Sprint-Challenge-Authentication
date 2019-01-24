const axios = require('axios');
const bcrypt = require("bcryptjs");
const { authenticate } = require('./middlewares');
const helpers = require('../helpers/helpers.js');
const db = require('../database/dbConfig.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  //Test
  server.get('/', (req, res) => {
    res.send('Testing testing 1 2 3');
  });
};


async function register (req, res) {
  try {
    console.log('Register test');
    const userCredentials = req.body;
    const hash = bcrypt.hashSync(userCredentials.password, 12);
    userCredentials.password = hash;

    const newUser = await db("users").insert(userCredentials);
    const token = helpers.generateToken(userCredentials);
    res.status(201).json({newUser, token});
  } 
  catch (err) {
        res.status(500).json({ message: "Register failed. Please try again" });
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  axios
    .get('https://safe-falls-22549.herokuapp.com/random_ten')
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
