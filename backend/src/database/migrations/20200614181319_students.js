
exports.up = function(knex) {
    return knex.schema.createTable('students', (table) => {
        table.string('student_id').primary();
        table.string('name').notNull();
        table.string('cpf').notNull().unique();
        table.string('mail').notNull();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('students');
};
