
const { TABLES } = require('../../config')

exports.up = function(knex) {
  return knex.schema.createTable(TABLES.USER_SMS_CODES, (t) => {
    t.increments('id');
    t.string('code');
    t.timestamp('expired');
    t.integer('userId').unsigned().notNullable();
    t.foreign('userId').references('id').inTable('Users');
    t.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLES.USER_SMS_CODES)
};
