// Conexão com o banco de dados(postgreSQL) utilizando o knex
const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.database);

module.exports = connection;