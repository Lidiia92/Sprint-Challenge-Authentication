const jwt_secret = require('../_secrets/keys.js')
const jwt = require("jsonwebtoken");

module.exports = {
  generateToken,
  protected
};

function generateToken(user) {
  const payload = {
    username: user.username,
    name: user.name,
  };

  const secret = jwt_secret.jwtKey;

  const options = {
    expiresIn: "30m"
  };

  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  // the auth token is normally sent in the Authorization header
  const token = req.headers.authorization;
  console.log(req.headers);

  if (token) {
    jwt.verify(token, jwt_secret.jwtKey, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Please provide a token" });
  }
}