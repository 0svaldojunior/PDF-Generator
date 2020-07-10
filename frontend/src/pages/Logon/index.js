import React, { Component } from 'react';

import GlobalStyle from '../../styles/global';
import { Container } from './styles';

import LogonForm from '../../components/LogonForm';
import LogonBackground from '../../components/LogonBackground';

class Logon extends Component {
  render () {
    return(
      <Container>
        <LogonForm />
        <LogonBackground />
        <GlobalStyle />
      </Container>
    ); 
  }
}

export default Logon;