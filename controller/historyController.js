const validationHandler = require('../helpers/validationHandler');
const { History } = require('../models')

class HistoryController {
  static async last10(req, res, next) {
    try {
      const histories = await History.findAll({
        where: { userId: req.params.userId},
        order: [['playAt', 'DESC']],
        limit: 10
      });
      histories.length ? res.status(200).json(histories) 
      : res.status(404).json({message: 'histories not found'});
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  static async create(req, res, next) {
    try {
      const history = await History.create({userId: req.user.id, ...req.body});
      res.status(200).json(history);
    } catch (error) {
      const notValid = validationHandler(error);
      notValid ? res.status(400).json(notValid)
      : res.status(500).json(error.message);
    }
  }
}

module.exports = HistoryController;