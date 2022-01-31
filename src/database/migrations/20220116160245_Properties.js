const { TABLES } = require('../../config')

exports.up = function(knex) {
  return knex.schema.createTable(TABLES.PROPERTIES, (t) => {
    t.increments('id');
    t.string('name');
    t.string('type');
    t.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLES.PROPERTIES)
};
