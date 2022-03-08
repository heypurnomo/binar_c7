const userRouter = require('express').Router();
const UserController = require('../../../controller/UserController');
const { authentication, authorization } = require('../../../middleware');

userRouter.use(authentication, authorization)
userRouter.get('/', UserController.findAll)
userRouter.get('/:id', UserController.findOne)
userRouter.post('/', UserController.create)
userRouter.put('/:id', UserController.update)
userRouter.delete('/:id', UserController.delete)

module.exports = userRouter;