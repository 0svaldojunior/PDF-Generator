
exports.up = function(knex) {
    return knex.schema.createTable('courses', (table) => {
       table.increments('course_id') .primary();
       table.string('name').notNull();
       table.string('workload').notNull();
       table.text('content').notNull();
       table.string('register_number').notNull();
       table.boolean('verse').notNull();
       table.boolean('historic').notNull();
       table.string('subject').notNull();
       table.text('mail_text').notNull();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('courses');
};
