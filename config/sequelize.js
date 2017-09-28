// Update with your config settings.
const Fs = require('fs');
const Path = require('path');
const _ = require('lodash');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envPath = process.env.NODE_ENV === 'test' ? Path.join(__dirname, '/../test/.env') : Path.join(__dirname, '/../.env-' + process.env.NODE_ENV);

try {
  Fs.statSync(envPath);
  require('dotenv').config({ path: envPath, silent: true });
} catch (err) {
  console.log(err);
  console.log(envPath + ' not found, load by environment variables');
}

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    host: !_.isEmpty(process.env.MYSQL_HOST) ? process.env.MYSQL_HOST : process.env.MYSQL_WRITE_HOST,
    dialect: 'mysql'
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    host: !_.isEmpty(process.env.MYSQL_HOST) ? process.env.MYSQL_HOST : process.env.MYSQL_WRITE_HOST,
    dialect: 'mysql'
  },
  stage: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    host: !_.isEmpty(process.env.MYSQL_HOST) ? process.env.MYSQL_HOST : process.env.MYSQL_WRITE_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    host: !_.isEmpty(process.env.MYSQL_HOST) ? process.env.MYSQL_HOST : process.env.MYSQL_WRITE_HOST,
    dialect: 'mysql'
  }
};
