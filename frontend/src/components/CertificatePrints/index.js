/* eslint-disable */
import React, { useState, useEffect } from 'react';

import { GlobalContainer, ScrollContainer, GridContainer, GridItem, Column, Column2, DivSearchBar } from './styles';

import TopButtons from '../TopButtons';
import api from '../../services/api';

import SearchBar from '../SearchBar';
import Email from '../Email';

function CertificatePrints() {
  const [certificates, setCertificates] = useState([]);
  const [courses, setCourses] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    async function loadCertificates() {
      if(content.length > 0) {
        setCertificates(certificates.filter(certificate => 
          certificate.student_name.includes(content) ||
          certificate.author.includes(content) ||
          certificate.course.includes(content) ||
          certificate.date.includes(content)));    
      } else {
        const response = await api.get('/certificates');
        setCertificates(response.data);

        const response2 = await api.get('/courses');
        setCourses(response2.data);
      }
    };

    loadCertificates();
    // eslint-disable-next-line 
  }, [content, certificates.length]);

  const generaterKey = (prefix) => {
    return `${prefix}-${new Date().getTime()}`;
  };

  async function sendMail(to, courseName, url, certificate_id) {
    const urlCertificate = Email(courseName, url);
    const subject = courses.filter(course => course.name === courseName)[0].subject;
    const text = courses.filter(course => course.name === courseName)[0].mail_text + urlCertificate;
    
    const data = {
      to,
      subject: subject,
      text: text
    };
    await api.post('/send-mail', data);
  }

  async function handleDeleteCertificate(id) {
    alert('Remoção realizada com SUCESSO!');
    try {
      await api.delete(`/certificates?certificate_id=${id}`, {
        data: {
          certificate_id: id
        }
      });
      setCertificates(certificates.filter(certificate => certificate.certificate_id !== id));
    } catch (error) {
      alert('Erro ao deletar a ferramenta, verifique e tente novamente');
    }
  }
  
  return(
    <GlobalContainer>
      <TopButtons />
      <DivSearchBar>
        <SearchBar content={content} setContent={setContent} />
      </DivSearchBar>
      <ScrollContainer>
        <GridContainer>
          {
            certificates.filter(certificate => certificate.signature === false && certificate.send === true).map(certificate => (
              <GridItem key={generaterKey(certificate.certificate_id)} >
                <Column>
                  <h1>Aluno: {certificate.student_name} </h1>
                  <h1>E-mail: {certificate.student_mail} </h1>
                  <h1>Curso: {certificate.course} </h1>
                  <h1>Data: {certificate.date} </h1>
                  <h1>Emissor: {certificate.author} </h1>
                </Column>
                
                <Column2> 
                  <a href={certificate.url} target='_blank' >
                    <button>Visualizar</button>
                  </a>

                  <a>
                    <button onClick={() => { 
                      alert('Re-envio realizado com sucesso!');
                      sendMail(certificate.student_mail, certificate.course, certificate.url, certificate.certificate_id) 
                    }}>
                      Re-Enviar
                    </button>
                  </a>

                  <a>
                    <button onClick={() => { handleDeleteCertificate(certificate.certificate_id) }} >Deletar</button>
                  </a>
                </Column2>
              </GridItem>
            ))
          }
        </GridContainer>
      </ScrollContainer>
    </GlobalContainer>
  );
}

export default CertificatePrints;