const historyRouter = require('express').Router();
const HistoryController = require('../../../controller/historyController');
const { authentication, authorization } = require('../../../middleware');

historyRouter.use(authentication, authorization);
historyRouter.get('/:userId', HistoryController.last10);
historyRouter.post('/', HistoryController.create);

module.exports = historyRouter;