import React, { Component } from 'react';

import GlobalStyles from '../../styles/global';
import { Container } from './styles';

import DashMenu from '../../components/DashMenu';
import CertificateComplete from '../../components/CertificatePrints';


class Print extends Component {
  render () {
    return(
      <Container>
        <DashMenu />
        <CertificateComplete />
        <GlobalStyles />
      </Container>
    );
  }
}

export default Print;