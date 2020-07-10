import React, { Component } from 'react';

import GlobalStyles from '../../styles/global';
import { Container } from './styles';

import DashMenu from '../../components/DashMenu';
import CoursesEdit from '../../components/CoursesEdit';

class EditCourses extends Component {
  render () {
    return(
      <Container>
        <DashMenu />
        <CoursesEdit />
        <GlobalStyles />
      </Container>
    );
  }
}

export default EditCourses;