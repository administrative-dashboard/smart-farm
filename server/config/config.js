
require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    timezone: 'Etc/GMT-4',
    minifyAliases: true,
    seederStorage: 'sequelize',
    logging: false,
  },
  test: {
    dialect: 'postgres',
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    timezone: 'Etc/GMT-4',
    minifyAliases: true,
    seederStorage: 'sequelize',
    logging: false,
  },
  production: {
    dialect: 'postgres',
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    timezone: 'Etc/GMT-4',
    minifyAliases: true,
    seederStorage: 'sequelize',
    logging: false,
  },
}
