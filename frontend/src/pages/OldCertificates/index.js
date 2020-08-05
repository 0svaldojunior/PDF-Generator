import React, { Component } from 'react';

import GlobalStyles from '../../styles/global';
import { Container } from './styles';

import DashMenu from '../../components/DashMenu';
import CertificateOld from '../../components/CertificateOld';


class OldCertificates extends Component {
  render () {
    return(
      <Container>
        <DashMenu />
        <CertificateOld />
        <GlobalStyles />
      </Container>
    );
  }
}

export default OldCertificates;