import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Arquivo central da aplicação, que gera conexão com o App(responsável pela tela central)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);