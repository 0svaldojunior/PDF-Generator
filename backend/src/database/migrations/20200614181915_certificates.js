
exports.up = function(knex) {
    return knex.schema.createTable('certificates', (table) => {
        table.increments('certificate_id').primary();
        table.string('date').notNull();
        table.boolean('complet').notNull();
        table.boolean('send').notNull();
        table.boolean('seal').notNull();
        table.string('author').notNull();
        table.string('course').notNull();
        table.string('student_name').notNull();
        table.string('student_mail').notNull();
        table.string('url').notNull();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('certificates');
};
