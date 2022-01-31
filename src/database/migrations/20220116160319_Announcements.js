const { TABLES } = require('../../config')

exports.up = function(knex) {
  return knex.schema.createTable(TABLES.ANNOUNCEMENTS, (t) => {
    t.increments('id');
    t.integer('categoryId').unsigned().notNullable();
    t.integer('userId').unsigned().notNullable();
    t.foreign('categoryId').references('id').inTable('Categories');
    t.foreign('userId').references('id').inTable('Users');
    t.timestamps(true, true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLES.ANNOUNCEMENTS)
};
