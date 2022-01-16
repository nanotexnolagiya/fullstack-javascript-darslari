
exports.up = function(knex) {
  return knex.schema.createTable('Offers', (t) => {
    t.increments('id');
    t.integer('categoryId').unsigned().notNullable();
    t.integer('userId').unsigned().notNullable();
    t.foreign('categoryId').references('id').inTable('Categories');
    t.foreign('userId').references('id').inTable('Users');
    t.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Offers')
};
