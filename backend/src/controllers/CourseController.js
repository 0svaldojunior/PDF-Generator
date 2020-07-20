const connection = require('../database/connection');

module.exports = {
    // Aplicação de uma seleção completa das informações presente na tabela
    async index(request, response) {
        const courses = await connection('courses').orderBy('name').select('*');

        return response.json(courses);
    },

    // Através dos dados fornecidos no corpo da requisição, é feita a inserção na tabela mencionda
    async create(request, response) {
        const { name, workload, content, register_number, verse, historic, subject, mail_text } = request.body;

        await connection('courses').insert({
            name,
            workload, 
            content, 
            register_number, 
            verse, 
            historic, 
            subject, 
            mail_text
        });
    },

    async setCourse(request, response) {
        const { course_id, name, workload, content, register_number, verse, historic, subject, mail_text } = request.body;
        
        const course = await connection('courses')
          .where('course_id', course_id)
          .update(
            {
                name,
                workload,
                content,
                register_number,
                verse,
                historic,
                subject,
                mail_text,
            }
          )
    
        return response.json(course);
    },

    // Com os parâmetros fornecidos na query da requisição(tool_id) foi possivel aplicar o filtro e
    // excluir a ferramenta escolhida.
    async delete(request, response) {
        const { course_id } = request.query;

        const course = await connection('courses')
            .where('course_id', course_id)
            .select('*')
            .first();
        
        if(course.course_id != course_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        const deleteCourse = await connection('courses').where('course_id', course_id).del();

        return response.json(deleteCourse);
    },
};
