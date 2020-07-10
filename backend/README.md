# Backend
    - Node utilizado(12.17.0) versão LTS https://nodejs.org/en/download/
    - Yarn utilizado(1.22.4) versão LTS https://classic.yarnpkg.com/en/docs/install/#mac-stable
    - Database utilizado(postgress SQL) versão LTS https://www.postgresql.org/download/
    - 1 Cliente Gráfico Database(PostgreSQL Express) downlad plugin VSCode {PostgreSQL}
    - 2 Cliente Gráfico Database(pgAdmin4) https://www.pgadmin.org/download/ 

## Execução
    yarn install
    yarn start

## Teste
    Acesse o link através do botão para baixar o software juntamente com os arquivos json de teste do backend.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=V4Company_Backend_Test&uri=https%3A%2F%2Fraw.githubusercontent.com%2F0svaldojunior%2FV4Company%2Fmaster%2Fexport.json%3Ftoken%3DAHQQNLIDB2JCAHBN3K6YDRS622DOS)  

## Raciocínio
    - Uso do knex(migrations) para auxilinar na criação de tabelas e consulta.
    - Uso de controles e rotas, para simplificar a criação e utilização das rotas(get, post, delete...).