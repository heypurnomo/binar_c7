const authRouter = require('express').Router();
const AuthController = require('../controller/authController');

authRouter.get('/signup', AuthController.signupGet);
authRouter.post('/signup', AuthController.signupPost);
authRouter.get('/login', AuthController.loginGet);
authRouter.post('/login', AuthController.loginPost);
authRouter.get('/logout', AuthController.logoutGet);

module.exports = authRouter;