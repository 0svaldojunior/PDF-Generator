import React, { Component } from 'react';

import GlobalStyles from '../../styles/global';
import { Container } from './styles';

import DashMenu from '../../components/DashMenu';
import CertificateIssued from '../../components/CertificateIssued';

class Issued extends Component {
  render () {
    return(
      <Container>
        <DashMenu />
        <CertificateIssued />
        <GlobalStyles />
      </Container>
    );
  }
}

export default Issued;