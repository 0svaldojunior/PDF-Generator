import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import { Container, GridItem } from './styles';
import { MdEdit } from 'react-icons/md';
import { TiLink } from 'react-icons/ti';


function DashInformation() {
  const [user_id, setUser_id] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [normalUser, setNormalUser] = useState(0);
  const [adminUser, setAdminUser] = useState(0);
  const [allCourses, setAllCourses] = useState(0);
  const [coursesWithHistoric, setCoursesWithHistoric] = useState(0);
  const [coursesNotWithHistoric, setCoursesNotWithHistoric] = useState(0);

  const history = useHistory();

  useEffect(() => {
    setMail(localStorage.getItem('mail'));
    async function loadUser() {
      try {
        const response = await api.get(`/users?mail=${localStorage.getItem('mail')}`, { 
          query: {
            data: {
              mail
            }
          }
         });
        setUser_id(response.data.filter(element => element.mail === localStorage.getItem('mail'))[0].user_id);
        localStorage.setItem('user_id', response.data.filter(element => element.mail === localStorage.getItem('mail'))[0].user_id);
        setName(response.data.filter(element => element.mail === localStorage.getItem('mail'))[0].name);
        setPassword(response.data.filter(element => element.mail === localStorage.getItem('mail'))[0].password);
        var adm = 0, norm = 0;
        for(var i = 0; i < response.data.length; i++) {
          if(response.data[i].type === false) norm++;
          else adm++;
        }
        setAdminUser(adm);
        setNormalUser(norm);
      } catch (err) {
        alert(`Falha ao carregar dados, tente novamente. ${err}`);
      }
    };

    async function loadCourses() {
      try {
        const response = await api.get('/courses');
        var withHistoric = 0, notWithHistoric = 0;
        for(var i = 0; i < response.data.length; i++) {
          if(response.data[i].historic === true) {
            withHistoric++;
          } else {
            notWithHistoric++;
          }
        }
        setCoursesWithHistoric(withHistoric);
        setCoursesNotWithHistoric(notWithHistoric);
        setAllCourses(withHistoric + notWithHistoric);
      } catch (error) {
        alert(`Falha ao carregar dados, tente novamente. ${error}`);
      }
    }
    loadUser();
    loadCourses();
  }, [mail]); 

  async function changeName(event) {
    event.preventDefault();
    var person = prompt(`Nome atual: ${name} | Informe o novo:`);
    if (person === null || person === "") {
      window.alert( "Você cancelou a operação." );
    } else {
      try {
        const data = {
          user_id,
          column: 'name', 
          data: person
        };
        await api.put(`/users/update`, data);
        window.alert( "Alteração realizada com sucesso!" );
        window.location.reload(false);
      } catch (error) {
        alert('Falha ao alterar os dados, verifique e tente novamente.');
      }
    }
  };

  async function changeMail() {
    var person = prompt(`E-mail atual: ${mail} | Informe o novo:`);
    if (person === null || person === "") {
      window.alert( "Você cancelou a operação." );
    } else {
      try {
        const data = {
          user_id,
          column: 'mail', 
          data: person
        };
        await api.put(`/users/update`, data);
        window.alert( "Alteração realizada com sucesso! \nVocê será redirecionado a página de login para entrar com o novo e-mail!" );
        history.push('/');
        window.location.reload(false);
        localStorage.clear();
      } catch (error) {
        alert('Falha ao alterar os dados, verifique e tente novamente.');
      }
    }
  };

  async function changePassword() {
    var person = prompt(`Senha tual: ${password} | Informe a nova:`);
    if (person === null || person === "") {
      window.alert( "Você cancelou a operação." );
    } else {
      try {
        const data = {
          user_id,
          column: 'password', 
          data: person
        };
        await api.put(`/users/update`, data);
        window.alert( "Alteração realizada com sucesso!" );
        window.location.reload(false);
      } catch (error) {
        alert('Falha ao alterar os dados, verifique e tente novamente.');
      }
    }
  };

  function PushCertificates() {
    try {
      return ( history.push('/certificates') );
    } catch (error) {
      alert('Falha ao trocar de página, verifique e tente novamente!');
    }
  };
  
  function PushCourses() {
    try {
      return ( history.push('/courses') );
    } catch (error) {
      alert('Falha ao trocar de página, verifique e tente novamente!');
    }
  };
  
  function PushUsers() {
    try {
      return ( history.push('/users') );
    } catch (error) {
      alert('Falha ao trocar de página, verifique e tente novamente!');
    }
  };
  
  return(
    <Container>
      <GridItem> 
        <h1>Perfil do Usuário</h1>
        <p>{name} <button onClick={changeName}> <MdEdit /> </button> </p>
        <p>{mail} <button onClick={changeMail}> <MdEdit /> </button> </p>
        <p>****** <button onClick={changePassword}> <MdEdit /> </button> </p>
      </GridItem>

      <GridItem>
        <h1>Informações dos Certificados</h1>
        <p>Emitidos: 200 <button onClick={PushCertificates}> <TiLink /> </button> </p>
        <p>Enviados: 120 <button onClick={PushCertificates}> <TiLink /> </button> </p>
        <p>Impressos: 80 <button onClick={PushCertificates}> <TiLink /> </button> </p>
      </GridItem>

      <GridItem>
        <h1>Informações dos Usuários</h1>
        <p>Normais: {normalUser} <button onClick={PushUsers}> <TiLink /> </button> </p>
        <p>Administradores: {adminUser} <button onClick={PushUsers}> <TiLink /> </button> </p>
      </GridItem>
      <GridItem>
        <h1>Informações dos Cursos</h1>
        <p>Totais: {allCourses} <button onClick={PushCourses}> <TiLink /> </button> </p>
        <p>Com histórico: {coursesWithHistoric} <button onClick={PushCourses}> <TiLink /> </button> </p>
        <p>Sem histórico: {coursesNotWithHistoric} <button onClick={PushCourses}> <TiLink /> </button> </p>
      </GridItem>
    </Container>
  );
}

export default DashInformation;