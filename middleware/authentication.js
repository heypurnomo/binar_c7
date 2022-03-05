const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config')

function authenticathion(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    const decodedData = jwt.verify(token, JWT_SECRET);
    req.user = { id: decodedData.id };
    next();
  } else {
    res.status(404).json({ message: "please login first" })
  }
}

module.exports = authenticathion