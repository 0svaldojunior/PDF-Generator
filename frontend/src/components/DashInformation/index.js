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
  const [certificates, setCertificates] = useState([]);
  const [numCertificatesIssued, setNumCertificatesIssued] = useState(0);
  const [numCertificatesComplete, setNumCertificatesComplete] = useState(0);
  const [numCertificatesSimple, setNumCertificatesSimple] = useState(0);
  const [numCertificatesWithSeal, setNumCertificatesWithSeal] = useState(0);

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
        localStorage.setItem('user_name', response.data.filter(element => element.mail === localStorage.getItem('mail'))[0].name);
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
    };

    loadUser();
    loadCourses();
  }, [mail]); 

  useEffect(() => {
    async function loadCerfiticates() {
      try {
        const response = await api.get('/certificates');
        setCertificates(response.data);
      } catch (error) {
        alert(`Falha ao carregar dados, tente novamente. ${error}`);
      }
    };

    loadCerfiticates();
    setNumCertificatesIssued(certificates.filter(certificate => certificate.send === false).length);
    setNumCertificatesComplete(certificates.filter(certificate => certificate.complet === true && certificate.send === true).length);
    setNumCertificatesSimple(certificates.filter(certificate => certificate.complet === false && certificate.send === true).length);
    setNumCertificatesWithSeal(certificates.filter(certificate => certificate.seal === true).length);
  }, [certificates]);

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

  function PushCertificates(to) {
    try {
      return ( history.push(`/${to}`) );
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
        <h1>Informações dos Certificados: {certificates.length} </h1>
        <p>
          Emitidos: {numCertificatesIssued} 
          <button onClick={() => PushCertificates('certificates-issued')}> <TiLink /> </button> 
        </p>

        <p>
          Completos: {numCertificatesComplete} 
          <button onClick={() => PushCertificates('certificates-complete')}> <TiLink /> </button> 
        </p>

        <p>
          Simples: {numCertificatesSimple} 
          <button onClick={() => PushCertificates('certificates-simple')}> <TiLink /> </button>
        </p>

        <p>Com Selo: {numCertificatesWithSeal}</p>
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