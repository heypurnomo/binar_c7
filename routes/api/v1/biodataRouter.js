const biodataRouter = require('express').Router();
const BiodataController = require('../../../controller/biodataController');

biodataRouter.get('/', BiodataController.findAll);
biodataRouter.get('/:userId', BiodataController.findByUserId);
biodataRouter.put('/:userId', BiodataController.update);

module.exports = biodataRouter