const { TABLES } = require('../../config')

exports.up = function(knex) {
  return knex.schema.createTable(TABLES.CATEGORIES_PROPERTIES, (t) => {
    t.increments('id');
    t.integer('categoryId').unsigned().notNullable();
    t.integer('propertyId').unsigned().notNullable();
    t.foreign('categoryId').references('id').inTable('Categories');
    t.foreign('propertyId').references('id').inTable('Properties');
    t.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLES.CATEGORIES_PROPERTIES)
};
