const connection = require('../database/connection');

module.exports = {
  // Aplicação de uma seleção completa das informações presente na tabela
  async index(request, response) {
    const users = await connection('users').select('*');

    return response.json(users);
  },

  async getUser(request, response) {
    const { mail } = request.query;
    
    const user = await connection('users')
        .where('mail', mail).first();

    if(user.mail !== mail) {
      return response.status(400).json({ error: 'Usuário não encontrado' });
    }

    return response.json(user);
  },

  async setUser(request, response) {
    const { user_id, column, data } = request.body;
    
    const user = await connection('users')
      .where('user_id', user_id)
      .update(column, data)


    return response.json(user);
  },

  async getUserType(request, response) {
    const { type } = request.query;
    
    const user = await connection('users').count('user_id').where('type', type);

    return response.json(user);
  },

    // Através dos dados fornecidos no corpo da requisição, é feita a inserção na tabela mencionda
  async create(request, response) {
    const { name, mail, password, type } = request.body;

    const user = await connection('users').insert({
      name,
      mail,
      password,
      type,
    });

    return response.json({ user })
  },

  async login(request, response) {
    const { mail, password } = request.body;

    const user = await connection('users')
      .where(
        {
          'mail': mail,
          'password': password
        }
      ).select('*')
      .first();

      if(!user) {
        return response.status(400).json({ error: 'No User found with this ID' });
      }

      return response.json(user);
  },

  // Com os parâmetros fornecidos na query da requisição(tool_id) foi possivel aplicar o filtro e
  // excluir a ferramenta escolhida.
  async delete(request, response) {
    const { user_id } = request.query;

    const user = await connection('users')
      .where('user_id', user_id)
      .select('*')
      .first();
        
    if(user.user_id != user_id) {
        return response.status(401).json({ error: 'Operation not permitted.' });
    }

    const deleteUser = await connection('users').where('user_id', user_id).del();

    return response.json(deleteUser);
  },
};
