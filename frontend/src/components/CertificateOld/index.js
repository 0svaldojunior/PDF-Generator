/* eslint-disable */
import React, { useState, useEffect } from 'react';

import { GlobalContainer, ScrollContainer, GridContainer, GridItem, Column, DivSearchBar } from './styles';

import TopButtons from '../TopButtons';
import api from '../../services/api';

import SearchBar from '../SearchBar';
function CertificateOld() {
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
    const urlCertificate = `<br><br><br> <p>Para visualizar e baixar seu certificado, <a href=${url} target='_blank' >CLICK AQUI</a> </p>`;
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
            certificates.filter(certificate => certificate.complet === true && certificate.send === true).map(certificate => (
              <GridItem key={generaterKey(certificate.certificate_id)} >
                <Column>
                  <h1>Aluno: {certificate.student_name} </h1>
                  <h1>Data: {certificate.date} </h1>
                  <a href={certificate.url} target='_blank' >
                    <button>Visualizar</button>
                  </a>
                </Column>
              </GridItem>
            ))
          }
        </GridContainer>
      </ScrollContainer>
    </GlobalContainer>
  );
}

export default CertificateOld;