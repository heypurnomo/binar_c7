const { PG_USERNAME, PG_PASSWORD, PG_DATABASE } = require(".");

module.exports = {
  "development": {
    "username": PG_USERNAME,
    "password": PG_PASSWORD,
    "database": PG_DATABASE,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": PG_USERNAME,
    "password": PG_PASSWORD,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": PG_USERNAME,
    "password": PG_PASSWORD,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
