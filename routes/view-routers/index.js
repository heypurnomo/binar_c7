const viewRouter = require('express').Router();
const ViewController = require('../../controller/viewController');
const checkUser = require('../../middleware/checkUser');

viewRouter.use(checkUser)
viewRouter.get('/', ViewController.home);
viewRouter.get('/login', ViewController.login);
viewRouter.get('/signup', ViewController.signup);
viewRouter.get('/logout', ViewController.logout);
viewRouter.get('/profil', ViewController.profil);
viewRouter.get('/profil/update', ViewController.updateBio);
viewRouter.get('/dashboard/user', ViewController.dashboardUser);
viewRouter.get('/dashboard/user/add', ViewController.dashboardUserAdd);
viewRouter.get('/playgame', ViewController.playgame);

module.exports = viewRouter;