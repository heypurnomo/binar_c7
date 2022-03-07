const v1 = require('express').Router();
const user = require('./userRouter');
const biodata = require('./biodataRouter');
const history = require('./historyRouter');

v1.use('/user', user);
v1.use('/biodata', biodata);
v1.use('/history', history);

module.exports = v1