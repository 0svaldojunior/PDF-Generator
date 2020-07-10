import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

import { GlobalContainer, ScrollContainer, Container, Box, Row2, BoxEditor, BoxText } from './styles';

import TopButtonsCourses from '../TopButtonsCourse';
import api from '../../services/api';

function MakeCourses({ onSubmit }) {
  const history = useHistory();
  
  const [courseName, setCourseName] = useState('');
  const [courseWorkLoad, setCourseWorkLoad] = useState('');
  const [courseAssuntMail, setCourseAssuntMail] = useState('');
  const [courseRegisterNumber, setCourseRegisterNumber] = useState('');
  const [courseVerse, setCourseVerse] = useState('');
  const [courseHistoric, setCourseHistoric] = useState('');
  const [courseText, setCourseText] = useState('');
  const [mailText, setMailText] = useState('');

  async function handleAddCourse(event) {
    event.preventDefault();
    try {
      alert('Parabéns, um novo curso foi cadastrado com SUCESSO!');
      history.push('/courses-list');

      await api.post('/courses', {
        name: courseName,
        workload: courseWorkLoad,
        content: courseText,
        register_number: courseRegisterNumber,
        verse: courseVerse === 'Sim' ? true : false,
        historic: courseHistoric === 'Sim' ? true : false,
        subject: courseAssuntMail,
        mail_text: mailText
      });
    } catch (error) {
      alert('Erro ao cadastrar o curso, verifique e tente novamente');
    }
  };

  const handleEditorChange1 = (content, editor) => {
    console.log('Content was updated:', content);
    setCourseText(content);
  };

  const handleEditorChange2 = (content, editor) => {
    console.log('Content was updated:', content);
    setMailText(content);
  };

  return(
    <GlobalContainer>
      <TopButtonsCourses />

      <ScrollContainer>
        <form onSubmit={handleAddCourse}>
          <Container>
            <Box>
              <Row2 input={960} h2={180}>
                <h2>Nome do curso: </h2>
                <input 
                  value={courseName}
                  onChange={event => setCourseName(event.target.value)}
                />
              </Row2>
            </Box>

            <Box>
              <Row2 input={960} h2={180}>
                <h2>Carga horária: </h2>
                <input 
                  value={courseWorkLoad}
                  onChange={event => setCourseWorkLoad(event.target.value)}
                />
              </Row2>
            </Box>

            <Box>
              <Row2 input={960} h2={180}>
                <h2>Assunto do E-mail: </h2>
                <input 
                  value={courseAssuntMail}
                  onChange={event => setCourseAssuntMail(event.target.value)}
                />
              </Row2>
            </Box>

            <Box>
              <Row2 input={960} h2={180}>
                <h2>Prefixo número de registro: </h2>
                <input 
                  value={courseRegisterNumber}
                  onChange={event => setCourseRegisterNumber(event.target.value)}
                />
              </Row2>
            </Box>

            <Box>
              <Row2 input={960} h2={180}>
                <h2>Certificado com verso? </h2>
                <input 
                  value={courseVerse}
                  onChange={event => setCourseVerse(event.target.value)}
                  list="listVerse"
                  type="search"
                />
                <datalist id="listVerse">
                  <option value="Sim" />
                  <option value="Não" />
                </datalist>
              </Row2>
            </Box>

            <Box>
              <Row2 input={960} h2={180}>
                <h2>Certificado com histórico? </h2>
                <input 
                  value={courseHistoric}
                  onChange={event => setCourseHistoric(event.target.value)}
                  list="listHistoric"
                  type="search"
                />
                <datalist id="listHistoric">
                  <option value="Sim" />
                  <option value="Não" />
                </datalist>
              </Row2>
            </Box>

            <BoxEditor>
              <h1>Conteúdo do Curso</h1>
              <BoxText>
                <Editor
                  apiKey="890ni8z581yd741ma62cd27n50du17qvxffl6feajt67d0yq"
                  initialValue={`<p>${courseText}</p>`}
                  init={{
                    height: 350,
                    menubar: true,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic backcolor | \n' +
                      'alignleft aligncenter alignright alignjustify | \n' +
                      'bullist numlist outdent indent | removeformat | help'
                  }}
                  onEditorChange={handleEditorChange1}
                />
              </BoxText>
            </BoxEditor>

            <BoxEditor>
              <h1>Conteúdo do E-mail</h1>
              <BoxText>
                <Editor
                    apiKey="890ni8z581yd741ma62cd27n50du17qvxffl6feajt67d0yq"
                    initialValue={`<p>${mailText}</p>`}
                    init={{
                      height: 350,
                      menubar: true,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                      ],
                      toolbar:
                        'undo redo | formatselect | bold italic backcolor | \n'+
                        'alignleft aligncenter alignright alignjustify | \n'+
                        'bullist numlist outdent indent | removeformat | help'
                    }}
                    onEditorChange={handleEditorChange2}
                  />
                </BoxText>
            </BoxEditor>

            <button type="submit">Criar Curso</button>
            
          </Container>
        </form>
      </ScrollContainer>
    </GlobalContainer>
  );
}

export default MakeCourses;