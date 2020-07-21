import axios from 'axios';

// Criação da conexão com o banco de dados gerando a api de serviços e selecionando a URL
// onde ele se encontra
const api = axios.create({
    baseURL: 'http://localhost:3000'
});

export default api;