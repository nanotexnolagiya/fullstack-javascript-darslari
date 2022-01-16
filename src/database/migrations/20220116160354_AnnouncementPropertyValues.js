
exports.up = function(knex) {
  return knex.schema.createTable('AnnouncementPropertyValues', (t) => {
    t.increments('id');
    t.string('value')
    t.integer('propertyId').unsigned().notNullable();
    t.integer('announcementId').unsigned().notNullable();

    t.foreign('propertyId').references('id').inTable('Properties');
    t.foreign('announcementId').references('id').inTable('Announcements');
    t.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('AnnouncementPropertyValues')
};
