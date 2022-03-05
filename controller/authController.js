const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../config');

// create json webtoken
const maxAge = 3 * 24 * 60 * 60;
function createToken(id) {
  return jwt.sign({id}, JWT_SECRET, {expiresIn: maxAge});
}

// error handler signup
function signupErrorhandler(err) {
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
      const user = await User.create(req.body);
      const bio = await user.createBiodata(req.body).catch((err) => {
        user.destroy();
        throw err
      });
      const [{id, email, role}, {name, gender, birthday}] = [user, bio]
      res.cookie('token', createToken(id), { 
        httpOnly: true, maxAge: maxAge * 1000 
      });
      res.status(201).json({id, email, role, name, gender, birthday});
    } catch (err) {
      const errors = signupErrorhandler(err);
      res.status(400).json(errors);
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

// User.findOne({
//   where: { id: 1 },
//   include: 'Biodata'
// }).then(data => console.log(data))

module.exports= AuthController