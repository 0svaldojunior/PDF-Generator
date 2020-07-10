import React, { Component } from 'react';

import GlobalStyles from '../../styles/global';
import { Container } from './styles';

import DashMenu from '../../components/DashMenu';
import DashInformation from '../../components/DashInformation';

class Dashboard extends Component {
  render () {
    return(
      <Container>
        <DashMenu />
        <DashInformation />
        <GlobalStyles />
      </Container>
    );
  }
}

export default Dashboard;