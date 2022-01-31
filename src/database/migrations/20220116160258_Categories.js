const { TABLES } = require('../../config')

exports.up = function(knex) {
  return knex.schema.createTable(TABLES.CATEGORIES, (t) => {
    t.increments('id');
    t.string('name');
    t.integer('parent');
    t.timestamps(true, true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLES.CATEGORIES)
};
