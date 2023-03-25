/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('templates', function (table) {
            table.increments('id');
            table.string('title', 300).notNullable();
            table.text('description').notNullable();
            table.text('template_info').notNullable();
            table.text('params'); // delimitadores del word 
            table.integer('category_id');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable("products")
  
};
