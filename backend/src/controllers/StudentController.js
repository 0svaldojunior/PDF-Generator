const connection = require('../database/connection');

module.exports = {
    // Aplicação de uma seleção completa das informações presente na tabela
    async index(request, response) {
        const students = await connection('students').select('*');

        return response.json(students);
    },

    // Através dos dados fornecidos no corpo da requisição, é feita a inserção na tabela mencionda
    async create(request, response) {
        const { student_id, name, cpf, mail } = request.body;

        const student = await connection('students').insert({
            student_id,
            name,
            cpf,
            mail,
        });

        return response.json({ student })
    },

    // Com os parâmetros fornecidos na query da requisição(tool_id) foi possivel aplicar o filtro e
    // excluir a ferramenta escolhida.
    async delete(request, response) {
        const { student_id } = request.query;

        const student = await connection('students')
            .where('student_id', student_id)
            .select('*')
            .first();
        
        if(student.student_id != student_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        const deleteStudent = await connection('students').where('student_id', student_id).del();

        return response.status(204).send().json(deleteStudent);
    },
};
