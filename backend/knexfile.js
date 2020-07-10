// Configurações do banco de dados
module.exports = {
    database: {
        client: 'pg',
        version: '12',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: '0svaldoJR..',
            database: 'vision',
        },
        migrations: {
            directory: 'src/database/migrations',
        },
    },
};