const { User, Biodata } = require('../models');
const bcrypt = require('bcrypt');
const validationHandler = require('../helpers/validationHandler');
const { createToken, maxAge } = require('../helpers/tokenHandler');

class AuthController {
  static signupGet(req, res) {
    res.render('signup')
  }

  static loginGet(req, res) {
    res.render('login')
  }

  static async signupPost(req, res) {
    try {
      let notValids;
      const user = await User
        .create(req.body)
        .catch(err => {
          const notValid = validationHandler(err);
          if (notValid) notValids = { ...notValid };
        })
      const bio = await Biodata
        .create(req.body)
        .catch(err => {
          if (user) user.destroy();
          const notValid = validationHandler(err);
          if (notValid) notValids = { ...notValids, ...notValid};
        })
      if (notValids) throw notValids;
      user.setBiodata(bio);
      res.cookie('token', createToken({id: user.id}), { 
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
      if (!user) throw Error('invalid email or password');
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) throw Error('invalid email or password');
      const token = createToken({id: user.id});
      res.cookie('token', token, {
        httpOnly: true, maxAge: maxAge * 1000
      });
      res.status(200).json({id: user.id});
    } catch (err) {
      res.status(400).json({message: err.message})
    }
  }

  static async logoutGet(req, res) {
    res.cookie('token', '', {maxAge: 1});
    res.status(200).json({message: 'logged out'})
  }
}

module.exports= AuthController