
exports.up = function(knex) {
  return knex.schema.createTable('Properties', (t) => {
    t.increments('id');
    t.string('name');
    t.string('type');
    t.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Properties')
};
