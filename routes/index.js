const router = require('express').Router();
const authRouter = require('./authRouter');
const apiRouter = require('./api')

router.get('/', (req, res) => res.render('home'));
router.use(authRouter);
router.use('/api', apiRouter)

module.exports = router;