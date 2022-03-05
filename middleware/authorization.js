const { User } = require('../models');

async function authorization(req, res, next) {
  try {
    const user = await User.findByPk(req.user.id);
    const id = req.url.slice(1);
    (
      ((req.method === 'PUT' || req.method === 'DELETE') && user.id != id)
      || req.method === 'POST'
    )
    && user.role === 'user'
    ? res.status(401).json({message: 'unauthorized'}) : next();
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = authorization
