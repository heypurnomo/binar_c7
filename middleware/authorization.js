const { User } = require('../models');

/**
 * user bisa lihat punya orang lain 
 * tapi tidak dapat update dan delete punya orang lain 
 * admin bisa segalanya
 */

async function authorization(req, res, next) {
  try {
    const user = await User.findByPk(req.user.id);
    const id = req.url.slice(1);
    ((req.method === 'PUT' || req.method === 'DELETE') && user.id != id)
      && user.role === 'user'
      ? res.status(401).json({ message: 'unauthorized' }) : next();
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = authorization
