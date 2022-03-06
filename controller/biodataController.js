const { Biodata } = require('../models');

class BiodataController {
  static async findAll(req, res) {
    try {
      const biodata = await Biodata.findAll();
      res.status(200).json(biodata);
    } catch (error) {
      res.status(500).json(error)     
    }
  }

  static async findByUserId(req, res) {
    try {
      const bio = await Biodata.findOne({where: {userId: req.params.userId}});
      bio ? res.status(200).json(bio)
      : res.status(400).json({message: 'user not found'});
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async update(req, res) {
    try {
      const bio = await Biodata.update(req.body, {
        where: { userId: req.params.userId }
      })
      bio[0] ? res.status(200).json(bio) 
      : res.status(400).json(bio)
    } catch (error) {
      const validation = errorHandler(error)
      validation ? res.status(400).json(validation)
      : res.status(500).json(error);
    }
  }
}

function errorHandler(err) {
  const errors = {};
  if (err.name === 'SequelizeValidationError') {
    err.errors.forEach(e => {
      errors[e.path] = e.message
    })
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    err.errors.forEach(e => {
      errors[e.path] = `${e.path} already exist`
    })
  } else {
    return false
  }
  return errors
}

module.exports = BiodataController