
exports.up = function(knex) {
    return knex.schema.createTable('students', (table) => {
        table.increments('student_id').primary();
        table.string('name').notNull();
        table.string('cpf').notNull();
        table.string('mail').notNull();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('students');
};
