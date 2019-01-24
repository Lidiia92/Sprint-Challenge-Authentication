const axios = require('axios');
const bcrypt = require("bcryptjs");
const { authenticate } = require('./middlewares');
const helpers = require('../helpers/helpers.js');
const db = require('../database/dbConfig.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', helpers.protected, getJokes);
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

async function login(req, res) {
  // implement user login
  try {
    const userCredentials = req.body;
    const userForCheck = await db("users")
    .where({ username: userCredentials.username })
    .first();

    if (
    userForCheck &&
    bcrypt.compareSync(userCredentials.password, userForCheck.password)
    ) {
    // login is successful
    // create the token
    const token = helpers.generateToken(userForCheck);

    res
        .status(200)
        .json({ message: `Welcome ${userForCheck.username}`, token });
    } else {
    res.status(401).json({
        message:
        "Your login attempt failed. Please check login and password and try again"
    });
    }
  } catch (err) {
      res.status(500).json({ message: "Your login attempt failed." });
  }
}

async function getJokes(req, res) {
  try {
    const endpoint = 'http://api.icndb.com/jokes/random/';
    const response = await axios.get(endpoint);
    const { data } = await response;
    console.log(data);
    res.status(200).json(response.data);
  }
  catch (err){
    res.status(500).json({ message: 'Error Fetching Jokes', error: err });
  }
}

// axios
// .get('https://safe-falls-22549.herokuapp.com/random_ten')
// .then(response => {
//   res.status(200).json(response.data);
// })
// .catch(err => {
//   res.status(500).json({ message: 'Error Fetching Jokes', error: err });
// });
