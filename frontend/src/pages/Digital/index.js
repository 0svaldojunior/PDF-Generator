import React, { Component } from 'react';

import GlobalStyles from '../../styles/global';
import { Container } from './styles';

import DashMenu from '../../components/DashMenu';
import CertificateDigital from '../../components/CertificateDigital';


class Digital extends Component {
  render () {
    return(
      <Container>
        <DashMenu />
        <CertificateDigital />
        <GlobalStyles />
      </Container>
    );
  }
}

export default Digital;