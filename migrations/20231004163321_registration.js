/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable('users', function (table) {
      table.string('username', 255).notNullable().unique();
      table.string('email', 255).notNullable().unique();
      table.string('password', 255).notNullable();
      table.dropColumn('user_name');
      table.dropColumn('user_email');
      table.dropColumn('user_password');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
  //it depends
  .alterTable('users', function (table) {
    table.string('user_name', 255).notNullable();
    table.string('user_email', 255).notNullable();
    table.string('user_password', 255).notNullable();
    table.dropColumn('username');
    table.dropColumn('email');
    table.dropColumn('password');
  });
};
