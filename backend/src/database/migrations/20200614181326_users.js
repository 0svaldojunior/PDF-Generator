
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('user_id').primary();
        table.string('name').notNull();
        table.string('mail').notNull();
        table.string('password').notNull();
        table.boolean('type').notNull();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
