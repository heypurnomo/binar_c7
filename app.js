const express = require('express');
const router = require('./routes')
const { APP_PORT } = require('./config');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(router)

app.listen(APP_PORT, () => {
  console.log(`listen at http://localhost:${APP_PORT}`)
})