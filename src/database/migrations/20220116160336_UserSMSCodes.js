
exports.up = function(knex) {
  return knex.schema.createTable('UserSMSCodes', (t) => {
    t.increments('id');
    t.string('code');
    t.timestamp('expired');
    t.integer('userId').unsigned().notNullable();
    t.foreign('userId').references('id').inTable('Users');
    t.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('UserSMSCodes')
};
