
exports.up = function(knex) {
    return knex.schema.createTable('certificates', (table) => {
        table.increments('certificate_id').primary();
        table.string('url').notNull();
        table.string('titration').notNull();
        table.integer('note').notNull();
        table.string('register_number').notNull();
        table.date('date').notNull();
        table.boolean('verse').notNull();
        table.boolean('historic').notNull();
        table.boolean('signature').notNull();
        table.integer('author').notNull();
        table.integer('course').notNull();

        table.foreign('author').references('student_id').inTable('students');
        table.foreign('course').references('course_id').inTable('courses');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('certificates');
};
