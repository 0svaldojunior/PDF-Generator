import React, { Component } from 'react';

import GlobalStyles from '../../styles/global';
import { Container } from './styles';

import NormalUser from '../../components/NormalUser';

class DashboardNormalUser extends Component {
  render () {
    return(
      <Container>
        <NormalUser />
        <GlobalStyles />
      </Container>
    );
  }
}

export default DashboardNormalUser;