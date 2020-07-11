import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';

import { Container, Row2, Course, Box, Button2, ScrollContainer, GlobalContainer } from './styles';
import TopButtons from '../TopButtons';
import api from '../../services/api';

function CertificateInformation() {

  const newDate =  new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const extenseMonth = 1 === month ? 'Janeiro' : 2 === month ? 'Fevereiro'  : 3 === month ? 'Março'  : 4 === month ? 'Abril'  : 5 === month ? 'Maio'  : 6 === month ? 'Junho'  : 7 === month ? 'Julho'  : 8 === month ? 'Agosto'  : 9 === month ? 'Setembro'  : 10 === month ? 'Outubro'  : 11 === month ? 'Novembro' : 'Dezembro';
  
  const [studentName, setStudentName] = useState('');
  const [studentCPF, setStudentCPF] = useState('');
  const [studentMail, setStudentMail] = useState('');
  const [note, setNote] = useState('');
  const [registerNumber, setRegisterNumber] = useState('P3V-NATH0X - Folha 89 do Livro número 03 do Registro de Certificados');
  const [date, setDate] = useState(`${day} de ${extenseMonth} de ${year}`);
  const [verse, setVerse] = useState('');
  const [historic, setHistoric] = useState('');
  const [seal, setSeal] = useState('');
  const [titration, setTitration] = useState('');
  const [signature, setSignature] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectCourse, setSelectCourse] = useState('');
  const [courseID, setCourseID] = useState(-1);
  const [thisCourse, setThisCourse] = useState({});

  useEffect(() => {
    setHistoric('');
    setSignature('');
    async function loadCourses() {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (error) {
        alert(`Erro ao carregar conteudo: ${error}`)
      }
    };

    loadCourses();
  }, [selectCourse]);
  
  const generaterKey = (prefix) => {
    return `${prefix}-${new Date().getTime()}`;
  };

  function createPDF() {
    if(selectCourse !== -1) {
      if(courses.filter(course => course.name === selectCourse)[0] !== undefined) {
        const data = {
          studentName,
          studentCPF,
          studentMail,
          note,
          registerNumber,
          date,
          verse,
          historic,
          seal,
          titration,
          signature,
          thisCourse,
          courseID,
          user_id: localStorage.getItem('user_id'),
          secondsNow: newDate.getTime().toPrecision()
        };
        api.post('/create-pdf', data)
          .then(() => api.get('fetch-pdf', { responseType: 'blob' }))
          .then((response) => {
            const pdfBlob = new Blob([response.data], { type: 'applications/pdf' });
            const fileName = `Certificado-${studentName}-${newDate.getTime().toPrecision()}.pdf`;

            const certificateDate = {
              url: fileName, 
              titration, 
              note: 0,
              register_number: registerNumber, 
              date: `${year}-${month}-${day}`, 
              verse: verse === 'Completo' ? true : false,
              historic: false,
              signature: false,
              author: localStorage.getItem('user_id'), 
              course: courseID
            };

            api.post('/certificates', certificateDate);
    
            saveAs(pdfBlob, fileName);
          });
      }
    }
  }

  return(
    <GlobalContainer>
      <TopButtons />
      
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
                value={verse}
                onChange={event => setVerse(event.target.value)}
                list="verseList"
                type="search"
              />
              <datalist id="verseList">
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
          
          {/* <a href={`mailto:${studentMail}?subject=${thisCourse.subject}&body=${thisCourse.mail_text}`} > */}
            <Button2 onClick={createPDF} >
              Gerar Certificado
            </Button2>
          {/* </a> */}
        </Container>
      </ScrollContainer>
    </GlobalContainer>
  );
}

export default CertificateInformation;