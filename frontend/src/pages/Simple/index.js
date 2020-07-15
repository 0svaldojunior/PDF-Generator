import React, { Component } from 'react';

import GlobalStyles from '../../styles/global';
import { Container } from './styles';

import DashMenu from '../../components/DashMenu';
import CertificateSimple from '../../components/CertificateSimple';


class Simple extends Component {
  render () {
    return(
      <Container>
        <DashMenu />
        <CertificateSimple />
        <GlobalStyles />
      </Container>
    );
  }
}

export default Simple;