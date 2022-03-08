const router = require('express').Router();
const apiRouter = require('./api');
const viewRouter = require('./view-routers');

router.use('/', viewRouter)
router.use('/api', apiRouter)
router.use((req, res, next) => {res.render('error')})

module.exports = router;