const knex = require('knex')({
  client: 'pg',
  connection: {
    database: process.env.POSTGRES_DB,
    user:     process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host:     process.env.POSTGRES_HOST
  }
});

module.exports = {
  dbConnection: knex
}