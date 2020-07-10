import React, { Component } from 'react';

import GlobalStyles from '../../styles/global';
import { Container } from './styles';

import DashMenu from '../../components/DashMenu';
import MakeCourses from '../../components/MakeCourses';

class Courses extends Component {
  render () {
    return(
      <Container>
        <DashMenu />
        <MakeCourses />
        <GlobalStyles />
      </Container>
    );
  }
}

export default Courses;