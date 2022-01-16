
exports.up = function(knex) {
  return knex.schema.createTable('Categories', (t) => {
    t.increments('id');
    t.string('name');
    t.integer('parent');
    t.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Categories')
};
