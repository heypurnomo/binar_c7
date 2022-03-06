const v1 = require('express').Router();
const user = require('./userRouter');
const biodata = require('./biodataRouter');

v1.use('/user', user);
v1.use('/biodata', biodata)

module.exports = v1