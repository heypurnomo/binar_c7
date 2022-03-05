const v1 = require('express').Router();
const user = require('./userRouter');

v1.use('/user', user);

module.exports = v1