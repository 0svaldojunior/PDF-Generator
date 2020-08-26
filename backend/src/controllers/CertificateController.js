const connection = require('../database/connection');

module.exports = {
    // Aplicação de uma seleção completa das informações presente na tabela
    async index(request, response) {
        const certificates = await connection('certificates').select('*');

        return response.json(certificates);
    },

    // Através dos dados fornecidos no corpo da requisição, é feita a inserção na tabela mencionda
    async create(request, response) {
        const { date, complet, send, signature, seal, author, course, student_name, student_mail, url } = request.body;

        const certificate = await connection('certificates').insert({
            date, 
            complet, 
            send, 
            seal,
            signature, 
            author, 
            course,
            student_name,
            student_mail,
            url
        });
        
        return response.json({ certificate })
    },

    async sended(request, response) {
        const { certificate_id } = request.body;
        
        const certificate = await connection('certificates')
          .where('certificate_id', certificate_id)
          .update({ send: true });
        
        console.log(certificate);
        return response.json(certificate);
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

        return response.json(deleteCertificate);
    },
};
