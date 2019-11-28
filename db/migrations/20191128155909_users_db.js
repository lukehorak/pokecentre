
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').unsigned().primary();
    table.dateTime('createdAt').notNull();
    table.dateTime('updatedAt').nullable();
    table.dateTime('deletedAt').nullable();

    table.string('email');
    table.string('password');
  })
};

exports.down = function(knex, Promise) {
  return  
};
