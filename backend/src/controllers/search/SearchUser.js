const connection = require('../../database/connection');

module.exports = {
    // Através dos parâmetros fornecidos na queri da requisição é possivel realizar
    // uma filtragem dentro ca coluna "tag(string)" para encontrar a existência da tag
    // informada na requisição, assim podendo devolver a resposta com o filtro aplicado
    async index(request, response) {
        const { content } = request.query;
        const users = await connection('users').where(function() {
            this.where('name', content)
                .orWhere('type', content)
                .orWhere('mail', content)
          });
        
        return response.json(users);
    }
};