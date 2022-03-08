const { User, Biodata, sequelize } = require('../models');
const { QueryTypes } = require('sequelize')
const validationHandler = require('../helpers/validationHandler')

class UserController {
  static async findAll(req, res) {
    const users = await sequelize.query(`
    SELECT users.id, users.role, users.email, biodata.name, biodata.gender, biodata.birthday
    FROM users JOIN biodata
    ON users.id = biodata."userId"`,{
      type: QueryTypes.SELECT
    });
    res.status(200).json(users)
  }

  static async findOne(req, res) {
    const user = await sequelize.query(`
    SELECT users.id, users.role, users.email, biodata.name, biodata.gender, biodata.birthday
    FROM users JOIN biodata
    ON users.id = biodata."userId"
    WHERE users.id = ${req.params.id}`,{
      type: QueryTypes.SELECT
    })
    Object.keys(user).length ? res.status(200).json(user) 
    : res.status(404).json({message: "user not found"});
  }

  static async create(req, res) {
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
      const [{ password, ...akunUser }, { userId, id, ...dataUser }] = [user.dataValues, bio.dataValues];
      res.status(201).json({ ...akunUser, ...dataUser });
    } catch (err) {
      res.status(400).json(err);
    }
  }

  static async update(req, res) {
    try {
      const user = await User.update(req.body, {
        where: { id: req.params.id },
        individualHooks: true
      });
      user[0] ? res.status(200).json({message: 'update successful'})
      : res.status(404).json({message: `user doesn't exist`});
    } catch (err) {
      const errors = validationHandler(err);
      res.status(400).json(errors)
    }
  }

  static async delete(req, res) {
    try {
      const user = await User.destroy({
        where: { id: req.params.id }
      });
      user ? res.status(200).json({message: 'user deleted'})
      : res.status(400).json({message: `user doesn't exist`})
    } catch (err) {
      console.log(err)
    }
  }
  
}

module.exports = UserController;