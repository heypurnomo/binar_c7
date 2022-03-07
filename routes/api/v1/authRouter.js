const authRouter = require('express').Router();
const AuthController = require('../../../controller/authController');

authRouter.post('/signup', AuthController.signupPost);
authRouter.post('/login', AuthController.loginPost);
authRouter.get('/logout', AuthController.logoutGet);

module.exports = authRouter;