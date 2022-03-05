const { User, Biodata } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../config');

// create json webtoken
const maxAge = 3 * 24 * 60 * 60;
function createToken(id) {
  return jwt.sign({id}, JWT_SECRET, {expiresIn: maxAge});
}

// error handler signup
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
    return err
  }
  return errors
}

class AuthController {
  static signupGet(req, res) {
    res.render('signup')
  }

  static loginGet(req, res) {
    res.render('login')
  }

  static async signupPost(req, res) {
    try {
      let errors;
      const user = await User
        .create(req.body)
        .catch(err => {
          const error = errorHandler(err);
          errors = { ...error };
        })
      const bio = await Biodata
        .create(req.body)
        .catch(err => {
          if (user) user.destroy();
          const error = errorHandler(err);
          errors = { ...errors, ...error};
        })
      if (errors) throw errors;
      user.setBiodata(bio);
      res.cookie('token', createToken(user.id), { 
        httpOnly: true, maxAge: maxAge * 1000 
      });
      const [{ password, ...akunUser }, { userId, id, ...dataUser }] = [user.dataValues, bio.dataValues];
      res.status(201).json({ ...akunUser, ...dataUser });
    } catch (err) {
      res.status(400).json(err);
    }
  }

  static async loginPost(req, res) {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({where: {email}});
      const auth = await bcrypt.compare(password, user.password);
      if (!user || !auth) throw Error('invalid email or password');
      const token = createToken(user.id);
      res.cookie('token', token, {
        httpOnly: true, maxAge: maxAge * 1000
      });
      res.status(200).json({id: user.id});
    } catch (err) {
      res.status(400).json({emessage: err.message})
    }
  }

  static async logoutGet(req, res) {
    res.cookie('token', '', {maxAge: 1});
    res.status(200).json({message: 'logged out'})
  }
}

module.exports= AuthController