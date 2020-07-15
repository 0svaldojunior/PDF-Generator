import React, { useState, useEffect } from 'react';

import { GlobalContainer, ScrollContainer, GridContainer, GridItem, Column, Column2 } from './styles';

import TopButtons from '../TopButtons';
import api from '../../services/api';

function CertificateComplete() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    async function loadCertificates() {
      const response = await api.get('/certificates');
      setCertificates(response.data);
    };

    loadCertificates();
    // eslint-disable-next-line 
  }, [certificates.length]);

  const generaterKey = (prefix) => {
    return `${prefix}-${new Date().getTime()}`;
  };
  
  return(
    <GlobalContainer>
      <TopButtons />

      <ScrollContainer>
        <GridContainer>
          {
            certificates.filter(certificate => certificate.complet === true).map(certificate => (
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
                    <button>Vizualizar</button>
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

export default CertificateComplete;