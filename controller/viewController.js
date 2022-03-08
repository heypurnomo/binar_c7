module.exports = class ViewController {
  static home(req, res) {
    res.render('home', {user: req.user});
  }
  static login(req, res) {
    res.render('login', {user: req.user});
  }
  static signup(req, res) {
    res.render('signup', {user: req.user});
  }
  static logout(req, res) {
    res.cookie('token', '', {maxAge:1});
    req.user = null;
    res.redirect('/');
  }
  static playgame(req, res) {
    req.user ? res.render('game') : res.redirect('/login');
  }
  static profil(req, res) {
    res.render('profil', {user: req.user});
  }
  static updateBio(req, res) {
    res.render('updateBio', {user: req.user});
  }
  static dashboardUser(req, res, next) {
    req.user.role === 'admin' ? res.render('dashboard/user', {user: req.user})
    : next(new Error('anda bukan admin')); 
  }
  static dashboardUserAdd(req, res, next) {
    req.user.role === 'admin' ? res.render('dashboard/createUser', {user: req.user})
    : next(new Error('anda bukan admin')); 
  }
}