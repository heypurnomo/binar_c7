const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const maxAge = 3 * 24 * 60 * 60;
function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {expiresIn: maxAge});
}
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET, (err, data) => {
    if (err) return null;
    return data;
  })
}

module.exports = {
  maxAge,
  createToken,
  verifyToken
}