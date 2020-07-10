const connection = require('../../database/connection');

module.exports = {
    // Através dos parâmetros fornecidos na queri da requisição é possivel realizar
    // uma filtragem dentro ca coluna "tag(string)" para encontrar a existência da tag
    // informada na requisição, assim podendo devolver a resposta com o filtro aplicado
    async index(request, response) {
        const { content } = request.query;
        const certificates = await connection('certificates').where(function() {
            this.where('titration', content)
                .orWhere('note', content)
                .orWhere('register_number', content)
                .orWhere('date', content)
                .orWhere('verse', content)
          });
        
        return response.json(certificates);
    }
};