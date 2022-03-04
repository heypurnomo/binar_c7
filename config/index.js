require('dotenv').config();
module.exports = {
  APP_PORT: process.env.APP_PORT || 3000,
  PG_USERNAME: process.env.PG_USERNAME || 'postgres',
  PG_PASSWORD: process.env.PG_PASSWORD || 'password',
  PG_DATABASE: process.env.PG_DATABASE || 'pipin_c7',
}