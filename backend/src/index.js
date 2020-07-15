require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(cors()); // utilizado para importar a api á uma URL separada da aplicação
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // informa que a aplicação irá "entender" o tipo json
app.use(express.static('public')); 
app.use(routes); // rotas criadas para manipular a database.

app.listen(3000);