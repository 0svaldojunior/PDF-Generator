import React, { Component } from 'react';

import GlobalStyles from '../../styles/global';
import { Container } from './styles';

import DashMenu from '../../components/DashMenu';
import CertificatePrint from '../../components/CertificatePrint';


class Print extends Component {
  render () {
    return(
      <Container>
        <DashMenu />
        <CertificatePrint />
        <GlobalStyles />
      </Container>
    );
  }
}

export default Print;