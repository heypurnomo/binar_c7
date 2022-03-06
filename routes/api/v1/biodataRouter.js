const biodataRouter = require('express').Router();
const BiodataController = require('../../../controller/biodataController');
const { authentication, authorization } = require('../../../middleware');

biodataRouter.use(authentication, authorization);
biodataRouter.get('/', BiodataController.findAll);
biodataRouter.get('/:userId', BiodataController.findByUserId);
biodataRouter.put('/:userId', BiodataController.update);

module.exports = biodataRouter