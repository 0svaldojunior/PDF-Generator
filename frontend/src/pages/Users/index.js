import React, { Component } from 'react';

import GlobalStyles from '../../styles/global';
import { Container } from './styles';

import DashMenu from '../../components/DashMenu';
import UserInformation from '../../components/UserInformation';

class Users extends Component {
  render () {
    return(
      <Container>
        <DashMenu />
        <UserInformation />
        <GlobalStyles />
      </Container>
    );
  }
}

export default Users;