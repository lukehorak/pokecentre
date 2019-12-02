
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').unsigned().primary();
    table.dateTime('createdAt').notNull().defaultTo(knex.raw('now()'));
    table.dateTime('updatedAt').nullable();
    table.dateTime('deletedAt').nullable();
    table.boolean('admin').notNullable().defaultTo(false)

    table.string('email');
    table.string('password');
  })
};

exports.down = (knex, Promise) => {
  return  knex.schema.dropTable('users');
};
