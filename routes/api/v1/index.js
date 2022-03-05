const v1 = require('express').Router();
const user = require('./userRouter')
const {authentication} = require('../../../middleware/authentication')

v1.use(authentication)
v1.use('/user', user)

module.exports = v1