import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Row2, Course, Box, Button2, ScrollContainer, GlobalContainer, GridItem, LogOutButton } from './styles';
import api from '../../services/api';

import { MdEdit } from 'react-icons/md';

function CertificateInformation() {
  const history = useHistory();
  const newDate =  new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const extenseMonth = 1 === month ? 'Janeiro' : 2 === month ? 'Fevereiro'  : 3 === month ? 'Março'  : 4 === month ? 'Abril'  : 5 === month ? 'Maio'  : 6 === month ? 'Junho'  : 7 === month ? 'Julho'  : 8 === month ? 'Agosto'  : 9 === month ? 'Setembro'  : 10 === month ? 'Outubro'  : 11 === month ? 'Novembro' : 'Dezembro';
  
  const [user_id, setUser_id] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentCPF, setStudentCPF] = useState('');
  const [studentMail, setStudentMail] = useState('');
  const [note, setNote] = useState('');
  const [registerNumber, setRegisterNumber] = useState('P3V-NATH0X - Folha 89 do Livro número 03 do Registro de Certificados');
  const [date, setDate] = useState(`${day}-${extenseMonth}-${year}`);
  const [complet, setComplet] = useState('');
  const [send, setSend] = useState('');
  const [seal, setSeal] = useState('');
  const [titration, setTitration] = useState('');// eslint-disable-next-line
  const [signature, setSignature] = useState('');
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectCourse, setSelectCourse] = useState('');
  const [courseID, setCourseID] = useState(-1);
  const [thisCourse, setThisCourse] = useState({});

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
      } catch (err) {
        alert(`Falha ao carregar dados, tente novamente. ${err}`);
      }
    };
    loadUser();
  }, [mail]);
  
  useEffect(() => {
    setSend('');
    setSignature('');
    async function load() {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (error) {
        alert(`Erro ao baixar dados:\n ${error}`)
      }
    };

    load();
  }, [selectCourse]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users');
      setUsers(response.data);
    };

    async function loadCourses() {
      const response = await api.get('/courses');
      setCourses(response.data);
    };

    async function loadStudents() {
      const response = await api.get('/students');
      setStudents(response.data);
    };

    loadUsers();
    loadCourses();
    loadStudents();
  }, [users.length, courses.length, students.length]);

  
  const generaterKey = (prefix) => {
    return `${prefix}-${new Date().getTime()}`;
  };

  async function createPDF() {
    if(selectCourse !== -1) {
      if(courses.filter(course => course.name === selectCourse)[0] !== undefined) {
        alert('Um novo certificado foi gerado com sucesso!');
        alert('Avise um usuário administrativo para verificar e enviar o e-mail.');
        const data = {
          studentName,
          studentCPF,
          studentMail,
          note,
          registerNumber,
          date,
          complet,
          send,
          seal,
          titration,
          thisCourse,
          course: selectCourse,
          courseID,
          pdfName: `Certificado-${studentName}.pdf`,
          author: localStorage.getItem('user_name'),
        };
        
        const response = await api.post('/create-pdf', data);
        console.log(response);
        api.post('/certificates', response.data);
        setTimeout(() => {
          window.location.reload(false);
        }, 3000);
      }
    }
  };

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

  function PushRoot() {
    try {
      localStorage.clear();
      history.push('/');
    } catch (error) {
      alert('Falha ao trocar de página, verifique e tente novamente!');
    }
  };
  
  return(
    <GlobalContainer>
      <GridItem> 
        <h1>Perfil do Usuário</h1>
        <p>{name} <button onClick={changeName}> <MdEdit /> </button> </p>
        <p>{mail} </p>
        <p>****** <button onClick={changePassword}> <MdEdit /> </button> </p>
        <LogOutButton onClick={PushRoot} >SAIR</LogOutButton>
      </GridItem>
      
      <ScrollContainer>
        <Container>
          <Course>
            <h1>Dados do Certificado</h1>
          </Course>

          <Box>
            <Row2 input={920} h2={200}>
              <h2>Selecione o curso:</h2>
              <input 
                value={selectCourse}
                onChange={event => {
                  if(courses.filter(course => course.name === event.target.value)[0] === undefined) {
                    setCourseID(-1);
                  } else {
                    setCourseID(courses.filter(course => course.name === event.target.value)[0].course_id);
                    setThisCourse(courses.filter(course => course.name === event.target.value)[0]);
                  }
                  setSelectCourse(event.target.value);
                }}
                list="selectCourseList"
                type="search"
              />
              <datalist id="selectCourseList">
                {
                  courses.map(course => (
                    <option key={generaterKey(course.course_id)} value={course.name} />
                  ))
                }
              </datalist>
            </Row2>
          </Box>

          <Box>
            <Row2 input={950} h2={170}>
              <h2>Nome completo do aluno:</h2>
              <input 
                value={studentName}
                onChange={event => setStudentName(event.target.value)}
              />
            </Row2>
          </Box>

          <Box>
            <Row2 input={960} h2={160}>
              <h2>CPF do aluno:</h2>
              <input 
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                value={studentCPF}
                onChange={event => setStudentCPF(event.target.value)}
              />
            </Row2>
          </Box>

          <Box>
            <Row2 input={940} h2={180}>
              <h2>E-mail do aluno:</h2>
              <input 
                value={studentMail}
                onChange={event => setStudentMail(event.target.value)}
              />
            </Row2>
          </Box>

          <Box>
            <Row2 input={940} h2={180}>
              <h2>Nota do aluno:</h2>
              <input 
                value={note}
                onChange={event => setNote(event.target.value)}
              />
            </Row2>
          </Box>

          <Box>
            <Row2 input={880} h2={240}>
              <h2>Número de Registro:</h2>
              <input 
                value={registerNumber}
                onChange={event => setRegisterNumber(event.target.value)}
              />
            </Row2>
          </Box>

          <Box>
            <Row2 input={905} h2={215}>
              <h2>Data por extenso:</h2>
              <input 
                value={date}
                onChange={event => setDate(event.target.value)}
              />
            </Row2>
          </Box>

          <Box>
            <Row2 input={940} h2={180}>
              <h2>Simples ou Completo?</h2>
              <input 
                value={complet}
                onChange={event => setComplet(event.target.value)}
                list="completList"
                type="search"
              />
              <datalist id="completList">
                <option value="Simples" />
                <option value="Completo" />
              </datalist>
            </Row2>
          </Box>

          <Box>
            <Row2 input={980} h2={150}>
              <h2>Possui selo?</h2>
              <input 
                value={seal}
                onChange={event => setSeal(event.target.value)}
                list="sealList"
                type="search"
              />
              <datalist id="sealList">
                <option value="Sim" />
                <option value="Não" />
              </datalist>
            </Row2>
          </Box>

          <Box>
            <Row2 input={1000} h2={130}>
              <h2>Titulação:</h2>
              <input 
                value={titration}
                onChange={event => setTitration(event.target.value)}
              />
            </Row2>
          </Box>
          
            <Button2 onClick={createPDF} >
              Gerar Certificado
            </Button2>
        </Container>
      </ScrollContainer>
    </GlobalContainer>
  );
}

export default CertificateInformation;