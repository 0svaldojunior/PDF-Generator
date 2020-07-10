import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import { Container, Form, Title, Password, Button, Image } from './styles.js';
import logoimg from '../../assets/img/certificate/i3v.png';


// Componente responsável pela criação do formulário de inserção das ferramentas no banco de dados
function LogonForm({ onSubmit }) {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
    
  async function handleLogin(event)  {
    event.preventDefault();

    try {
      const response = await api.post('dashboard', { mail, password });

      localStorage.setItem('mail', mail);
      localStorage.setItem('@Logon/response', response);

      history.push('/dashboard'); 
    } catch (err) {
      alert(`Falha no login, tente novamente. ${err}`);
    }
  };

  return (
    <Container>
      <Image src={logoimg} />
      <Form onSubmit={handleLogin}>
        <Title>Seja Bem Vindo!</Title>
        <input 
          placeholder = "E-mail"
          value = {mail}
          onChange = { event => setMail(event.target.value) }
        />

        <Password>
          <input
            type="password"
            placeholder = "Senha"
            value = {password}
            onChange = { event => setPassword(event.target.value) }
          />
        </Password>

        <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  );   
}

export default LogonForm;