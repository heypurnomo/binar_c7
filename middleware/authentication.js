const { verifyToken } = require('../helpers/tokenHandler');
const { User } = require('../models');

async function authenticathion(req, res, next) {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(400).json({message: "please login first"});
    const data = verifyToken(token);
    if (!data) return res.status(400).json({message: "jwt malformed"});
    const user = User.findByPk(data.id);
    if(!user) return res.status(404).json({message: "user not found"});
    req.user = {id: data.id};
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = authenticathion