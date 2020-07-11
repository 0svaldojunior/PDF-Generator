const connection = require('../database/connection');

module.exports = {
    // Aplicação de uma seleção completa das informações presente na tabela
    async index(request, response) {
        const certificates = await connection('certificates').select('*');

        return response.json(certificates);
    },

    // Através dos dados fornecidos no corpo da requisição, é feita a inserção na tabela mencionda
    async create(request, response) {
        const { url, titration, note, register_number, date, verse, historic, signature, author, course } = request.body;

        const certificate = await connection('certificates').insert({
            url, 
            titration, 
            note, 
            register_number, 
            date, 
            verse, 
            historic, 
            signature, 
            author, 
            course
        });

        return response.json({ certificate })
    },

    // Com os parâmetros fornecidos na query da requisição(tool_id) foi possivel aplicar o filtro e
    // excluir a ferramenta escolhida.
    async delete(request, response) {
        const { certificate_id } = request.query;

        const certificate = await connection('certificates')
            .where('certificate_id', certificate_id)
            .select('*')
            .first();
        
        if(certificate.certificate_id != certificate_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        const deleteCertificate = await connection('certificates').where('certificate_id', certificate_id).del();

        return response.status(204).send().json(deleteCertificate);
    },
};
