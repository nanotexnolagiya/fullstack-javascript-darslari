
exports.up = function(knex) {
  return knex.schema.createTable('Users', (t) => {
    t.increments('id');
    t.string('email').unique().notNullable();
    t.string('phone').unique().nullable();
    t.string('firstName').nullable();
    t.string('lastName').nullable();
    t.boolean('status').defaultTo(false);
    t.boolean('isAdmin').defaultTo(false);
    t.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Users')
};