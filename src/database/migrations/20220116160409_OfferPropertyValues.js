
exports.up = function(knex) {
  return knex.schema.createTable('OfferPropertyValues', (t) => {
    t.increments('id');
    t.string('value')
    t.integer('propertyId').unsigned().notNullable();
    t.integer('offerId').unsigned().notNullable();
    t.foreign('propertyId').references('id').inTable('Properties');
    t.foreign('offerId').references('id').inTable('Offers');
    t.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('OfferPropertyValues')
};
