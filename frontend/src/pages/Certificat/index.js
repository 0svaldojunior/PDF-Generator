import React, { Component } from 'react';

import GlobalStyles from '../../styles/global';
import { Container } from './styles';

import DashMenu from '../../components/DashMenu';
import Information from '../../components/CertificateInformation';

class Certificates extends Component {
  render () {
    return(
      <Container>
        <DashMenu />
        <Information />
        <GlobalStyles />
      </Container>
    );
  }
}

export default Certificates;