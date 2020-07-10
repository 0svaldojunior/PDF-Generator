import React, { Component } from 'react';

import GlobalStyles from '../../styles/global';
import { Container } from './styles';

import DashMenu from '../../components/DashMenu';
import CoursesList from '../../components/CoursesList';

class ListCourses extends Component {
  render () {
    return(
      <Container>
        <DashMenu />
        <CoursesList />
        <GlobalStyles />
      </Container>
    );
  }
}

export default ListCourses;