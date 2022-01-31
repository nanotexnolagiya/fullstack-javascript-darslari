
const { TABLES } = require('../../config')

exports.up = function(knex) {
  return knex.schema.createTable(TABLES.OFFER_PROPERTY_VALUES, (t) => {
    t.increments('id');
    t.string('value')
    t.integer('propertyId').unsigned().notNullable();
    t.integer('offerId').unsigned().notNullable();
    t.foreign('propertyId').references('id').inTable('Properties');
    t.foreign('offerId').references('id').inTable('Offers');
    t.timestamps(true, true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLES.OFFER_PROPERTY_VALUES)
};
