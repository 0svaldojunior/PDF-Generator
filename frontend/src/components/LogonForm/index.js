import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import { Container, Form, Title, Password, Button, Image } from './styles.js';
import logoimg from '../../assets/img/certificate/i3v.png';


// Componente responsável pela criação do formulário de inserção das ferramentas no banco de dados
function LogonForm({ onSubmit }) {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const history = useHistory();
    
  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('users');
      setUsers(response.data);
    };

    loadUsers();
  }, []);
  
  async function handleLogin(event)  {
    event.preventDefault();

    try {
      const response = await api.post('dashboard', { mail, password });
      // const response2 = await api.get('users');
      // setUsers(response2.data);

      localStorage.setItem('mail', mail);
      localStorage.setItem('@Logon/response', response);
      const type = users.filter(user => user.mail === mail)[0].type;
      console.log(type);

      if(mail.length > 5) type === true ? history.push('/dashboard') : history.push('/dashboard-normal-user'); 
      
    } catch (err) {
      alert(`Falha no login, verifique e tente novamente. ${err}`);
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