const router = require('express').Router();
const authRouter = require('./authRouter');

router.get('/', (req, res) => res.render('home'));
router.use(authRouter);

module.exports = router;