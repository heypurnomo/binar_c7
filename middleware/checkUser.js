const { verifyToken } = require('../helpers/tokenHandler');

module.exports = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return next();
    const data = verifyToken(token);
    if (!data) return next();
    req.user = data;
    next();
  } catch (error) {
    console.log(error)
  }
}