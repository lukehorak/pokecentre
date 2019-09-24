exports.up = function(knex, Promise) {
  return knex.schema.createTable('pokedex', function (table) {
    table.string('id').primary();
    table.string('name');
    table.string('species');
    table.string('primary_type');
    table.string('secondary_type');
    table.integer('hp');
    table.integer('speed');
    table.integer('attack');
    table.integer('defense');
    table.integer('special_attack');
    table.integer('special_defense');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('polls');
};
